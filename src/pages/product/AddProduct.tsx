import Button from "@/ui/Button"
import CustomSelect from "@/ui/CustomSelect"
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import InputField from "@/ui/InputField"
import { useForm } from "react-hook-form";
import { useProductMutation } from "@/hooks/useMutateData";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { convertToSelectOptions } from "@/utils/convertToSelectOptions";
import { useCategoryData } from "@/hooks/useQueryData";
import { useLocation, useNavigate } from "react-router-dom";
import ChooseImage from "@/components/ChooseImage";
import toast from "react-hot-toast";


export default function AddProduct() {
    const location = useLocation()
    const editData = location?.state
    const [selectedCategory, setSelectedCategory] = useState(editData ? editData?.category : "")
    const [hasSubmittedClick, setHasSubmittedClick] = useState(false)
    const [selectedImage, setSelectedImage] = useState(editData?.images?.[0])
    const [inStock, setInStock] = useState(editData ? editData?.inStock : true)
    const [value, setValue] = useState(editData ? editData?.description : "")
    const { data } = useCategoryData()
    const categoryOptions = convertToSelectOptions(data?.data)
    const navigate = useNavigate()


    const fieldSchema = Yup.object().shape({
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
            ...editData
        }
    });

    const productMutation = useProductMutation();
    const categoryField = data?.data?.filter((item) => item?._id === selectedCategory)?.[0]?.tags

    const onSubmitHandler = async (data) => {
        const filteredKeys = Object.keys(data).filter(key => categoryField.includes(key));

        const categoryValues = filteredKeys.map(key => ({
            name: key,
            description: data[key]
        }));
        const postData = {
            ...data,
            images: selectedImage,
            inStock: inStock,
            isRohan: true,
            category: selectedCategory,
            categoryField: categoryValues,
            description: value,
        }

        try {
            const response = await productMutation.mutateAsync([editData ? "patch" : "post", editData ? `update/${editData?._id}` : "create/", postData])
            navigate("/product")
            toast.success("Product added successfully")
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

    const editSelectedCategory = categoryOptions?.filter((item) => item?.value === editData?.category)

    return (
        <div className="m-4 p-6 rounded-xl bg-white">
            <div className="text-[#22244D] font-medium  text-lg mb-2">{editData ? "Edit" : "Add"} Product</div>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <div className="flex flex-col gap-4">

                    <div className="flex items-center justify-between gap-2">
                        <div className="w-2/3">
                            <InputField register={register} name="name" placeholder="Enter product name" className="w-full text-sm text-gray-500" defaultValue="" required label="Product Name" />
                            <p className="text-red-600 text-xs">
                                {errors?.name?.message}
                            </p>
                        </div>
                        <div className="w-1/3">
                            <CustomSelect disabled={editData} options={categoryOptions} placeholder={editSelectedCategory?.[0]?.label ?? "Select category"} className={"w-full text-sm text-gray-500"} labelName={"Category"} required={true} setSelectedField={setSelectedCategory} />
                            <p className="text-red-600 text-xs">
                                {hasSubmittedClick && !selectedCategory && "Required"}
                            </p>
                        </div>
                    </div>
                    <ChooseImage setSelectedImage={setSelectedImage} selectedImage={selectedImage} defaultUrl={editData?.images?.[0]?.url} />
                    {
                        selectedCategory &&
                        <>

                            {!editData ? <div className="grid grid-cols-3 gap-2">
                                {
                                    categoryField?.map((item) => {
                                        return (<div>
                                            <InputField register={register} name={item} placeholder={`Enter ${item}`} className="w-full text-sm text-gray-500" defaultValue="" required label={item} />
                                            {/* <p className="text-red-600 text-xs">
                                                {errors?.brand?.message}
                                            </p> */}
                                        </div>)
                                    })
                                }
                            </div>
                                :
                                <div className="grid grid-cols-3 gap-2">
                                    {
                                        editData?.categoryField?.map((item) => {
                                            return (<div>
                                                <InputField register={register} name={item?.name} placeholder={`Enter ${item?.name}`} className="w-full text-sm text-gray-500" defaultValue={item?.description} required label={item?.name} />
                                                {/* <p className="text-red-600 text-xs">
                                                    {errors?.brand?.message}
                                                </p> */}
                                            </div>)
                                        })
                                    }
                                </div>}
                        </>

                    }


                    <div className="grid grid-cols-3 gap-2">
                        <div>
                            <InputField register={register} name="brand" placeholder="Enter brand name" className="w-full text-sm text-gray-500" defaultValue="" required label="Brand" />
                            <p className="text-red-600 text-xs">
                                {errors?.brand?.message}
                            </p>
                        </div>

                        <div>
                            <InputField register={register} type="number" name="price" placeholder="Enter product price" className="w-full text-sm text-gray-500" defaultValue="" required label="Price" />
                            <p className="text-red-600 text-xs">
                                {errors?.price?.message}
                            </p>
                        </div>
                        <div>
                            <InputField register={register} type="number" name="discount" placeholder="Enter discount price" className="w-full text-sm text-gray-500" defaultValue="" required label="Discount" />
                            <p className="text-red-600 text-xs">
                                {errors?.discount?.message}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" checked={inStock} onClick={() => setInStock(!inStock)} id="" />
                            <p className="text-[#344054] font-medium text-sm mb-1">In Stock ?</p>
                            {/* <Switch onChange={() => setInStock(!inStock)} className="bg-gray-300" /> */}
                        </div>
                        {
                            inStock && <div>
                                <InputField register={register} type="number" name="inStockCount" placeholder="Enter in stock count" className="w-full text-sm text-gray-500" defaultValue="" required label="In Stock Count" />
                                <p className="text-red-600 text-xs">
                                    {errors?.brand?.message}
                                </p>
                            </div>
                        }

                    </div>


                    <div>
                        <p className="text-[#344054] font-medium text-sm mb-1">Description <span className="text-red-600">*</span> </p>

                        <ReactQuill theme="snow" className="h-[100px] mb-10" value={value} onChange={setValue} />
                    </div>

                </div>
                <div className="flex justify-end">
                    <div className="grid grid-cols-1 w-1/6  mt-10 gap-2">
                        {/* <Button buttonName={"Clear"} className={"w-full "} danger handleButtonClick={(e) => {
                            handleClear(e)
                        }} icon={""} /> */}
                        <Button type="submit" buttonName={`${editData ? "Edit" : "Add"} Product`} handleButtonClick={() => setHasSubmittedClick(true)} className={"w-full"} icon={""} />
                    </div>
                </div>
            </form>
        </div>
    )
}
