import ChooseImage from "@/components/ChooseImage"
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Button from "@/ui/Button"
import CustomSelect from "@/ui/CustomSelect"
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import InputField from "@/ui/InputField"
import { useForm } from "react-hook-form";
import { useCategoryMutation, useCourseMutation, useFileMutation } from "@/hooks/useMutateData";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { convertToSelectOptions } from "@/utils/convertToSelectOptions";
import { useCategoryData } from "@/hooks/useQueryData";


export default function AddProductModal({ asChild, children, edit, editData }) {
    const [open, setOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState(edit ? editData?.courseGroup?.id : "")
    const [hasSubmittedClick, setHasSubmittedClick] = useState(false)
    const [selectedImage, setSelectedImage] = useState()
    const [value, setValue] = useState(edit ? editData?.description : "")
    const { data } = useCategoryData()
    const categoryOptions = convertToSelectOptions(data?.data)

    const fieldSchema = Yup.object().shape({
        title: Yup.string()
            .required("Required")
            .max(36, "Must be 36 characters or less"),
        courseid: Yup.string()
            .required("Required")
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(fieldSchema),
        defaultValues: {
            courseid: editData?.courseID,
            title: editData?.title,
        }
    });

    const categoryMutation = useCategoryMutation();


    const onSubmitHandler = async (data) => {
        const postData = {
            ...data,
            file: selectedImage,
            available: true,
            coursegroupid: selectedCategory,
            description: value,
        }
        try {
            const response = await categoryMutation.mutateAsync([edit ? "patch" : "post", edit ? `update/${editData?.id}` : "create/", postData])
            console.log("response", response)
            setOpen(false)
            reset()
        } catch (err) {
            console.log("err", err)
        }
    }

    const handleClear = (e) => {
        e.preventDefault()
        setValue("")
        setSelectedImage()
        setSelectedCategory([])
        reset()
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild={asChild}>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]  min-w-[500px] bg-[#FAFAFA]">
                <DialogTitle className="text-[#22244D] font-medium text-base">{edit ? "Edit" : "Add"} Product</DialogTitle>
                <form onSubmit={handleSubmit(onSubmitHandler)}>
                    <div className="flex flex-col gap-4">
                        {/* <ChooseImage setSelectedImage={setSelectedImage} selectedImage={selectedImage} defaultUrl={editData?.thumbnail} /> */}
                        <div>
                            <InputField register={register} name="name" placeholder="Enter product name" className="w-full text-sm text-gray-500" defaultValue="" required label="Product Name" />
                            <p className="text-red-600 text-xs">
                                {errors?.name?.message}
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <CustomSelect options={categoryOptions} placeholder={"Select category"} className={"w-full text-sm text-gray-500"} labelName={"Category"} required={true} setSelectedField={setSelectedCategory} />
                                <p className="text-red-600 text-xs">
                                    {hasSubmittedClick && !selectedCategory && "Required"}
                                </p>
                            </div>
                            <div>
                                <InputField register={register} name="brand" placeholder="Enter brand name" className="w-full text-sm text-gray-500" defaultValue="" required label="Brand" />
                                <p className="text-red-600 text-xs">
                                    {errors?.brand?.message}
                                </p>
                            </div>
                            <div>
                                <InputField register={register} name="price" placeholder="Enter product price" className="w-full text-sm text-gray-500" defaultValue="" required label="Price" />
                                <p className="text-red-600 text-xs">
                                    {errors?.price?.message}
                                </p>
                            </div>
                            <div>
                                <InputField register={register} name="discount" placeholder="Enter discount price" className="w-full text-sm text-gray-500" defaultValue="" required label="Discount" />
                                <p className="text-red-600 text-xs">
                                    {errors?.discount?.message}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <p className="text-[#344054] font-medium text-sm mb-1">In Stock ?</p>
                                <Switch className="bg-gray-300" />
                            </div>
                        </div>

                        <div>
                            <p className="text-[#344054] font-medium text-sm mb-1">Description <span className="text-red-600">*</span> </p>

                            <ReactQuill theme="snow" className="h-[100px] mb-10" value={value} onChange={setValue} />
                        </div>

                    </div>
                    <div className="grid grid-cols-2 w-full mt-10 gap-2">
                        <Button buttonName={"Clear"} className={"w-full "} danger handleButtonClick={(e) => {
                            handleClear(e)
                        }} icon={""} />
                        <Button type="submit" buttonName={`${edit ? "Edit" : "Add"} Product`} handleButtonClick={() => setHasSubmittedClick(true)} className={"w-full"} icon={""} />
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
