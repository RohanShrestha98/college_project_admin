import ChooseImage from "@/components/ChooseImage"
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Button from "@/ui/Button"
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import InputField from "@/ui/InputField"
import { useForm } from "react-hook-form";
import { useCategoryMutation } from "@/hooks/useMutateData";
import { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import toast from 'react-hot-toast';
import KeywordSelect from "@/components/KeywordSelect";


export default function AddCategoryModal({ asChild, children, edit, editData }) {
    const [open, setOpen] = useState(false)
    const [selectedImage, setSelectedImage] = useState()
    const [value, setValue] = useState(edit ? editData?.description : "")
    const [tags, setTags] = useState([])

    const fieldSchema = Yup.object().shape({
        title: Yup.string()
            .required("Required")
            .max(36, "Must be 36 characters or less"),
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
            title: editData?.title,
        }
    });
    const categoryMutation = useCategoryMutation();


    const onSubmitHandler = async (data) => {
        const postData = {
            ...data,
            description: value,
            thumbnail: selectedImage && selectedImage,
            tags: tags,
        };
        try {
            const response = await categoryMutation.mutateAsync([edit ? "patch" : "post", edit ? `update/${editData?.id}` : "create/", postData])
            toast.success("Category added successfully")
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
        reset()
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild={asChild}>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]  min-w-[500px] bg-[#FAFAFA]">
                <DialogTitle className="text-[#22244D] font-medium text-base">{edit ? "Edit" : "Add"} Category</DialogTitle>
                <form onSubmit={handleSubmit(onSubmitHandler)}>
                    <div className="flex flex-col gap-4">
                        <ChooseImage setSelectedImage={setSelectedImage} selectedImage={selectedImage} defaultUrl={editData?.thumbnail} />

                        <div className="">
                            <InputField register={register} name="title" placeholder="Enter Category Name" className="w-full text-sm text-gray-500" defaultValue="" required label="Category Name" />
                            <p className="text-red-600 text-xs">
                                {errors?.title?.message}
                            </p>
                        </div>
                        <div>

                            <p className="text-[#344054] font-medium text-sm mb-1">Description </p>
                            <ReactQuill theme="snow" className="h-[100px] mb-10" value={value} onChange={setValue} />
                        </div>
                        <KeywordSelect
                            title={
                                "Enter the field you want add as an feature in this category"
                            }
                            id="catagory_inputfield "
                            tags={tags}
                            setTags={setTags}
                        />

                    </div>
                    <div className="grid grid-cols-2 w-full mt-10 gap-2">
                        <Button buttonName={"Clear"} className={"w-full "} danger handleButtonClick={(e) => {
                            handleClear(e)
                        }} icon={""} />
                        <Button type="submit" buttonName={`${edit ? "Edit" : "Add"} Category`} handleButtonClick={() => { }} className={"w-full"} icon={""} />
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
