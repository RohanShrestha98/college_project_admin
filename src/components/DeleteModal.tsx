import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Button from "@/ui/Button"
import { useCategoryMutation, useProductMutation, useStatusToggleMutation } from "@/hooks/useMutateData";
import 'react-quill/dist/quill.snow.css';
import { useState } from "react";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";


export default function DeleteModal({ asChild, children, title, desc, id }) {
    const [open, setOpen] = useState(false)
    const orderProductMutation = useStatusToggleMutation()
    const categoryMutation = useCategoryMutation()
    const productMutation = useProductMutation()

    const location = useLocation()
    const deleteMutation = location?.pathname == "/order-product" ? orderProductMutation : location?.pathname == "/category" ? categoryMutation : productMutation


    const handleDelete = async () => {
        try {
            const response = await deleteMutation.mutateAsync(["delete", `delete/${id}/`])
            setOpen(false)
            location?.pathname == "/order-product" ? toast.success("Cancel order successfully") : location?.pathname == "/category" ? toast.success("Category deleted successfully") : toast.success("Product Deleted successfully")
        } catch (err) {
            console.log("err", err)
        }

    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild={asChild}>
                {children}
            </DialogTrigger>
            <DialogContent className="max-w-[325px]  min-w-[300px] bg-[#FAFAFA]">
                <DialogTitle className="text-[#22244D] font-medium text-base">{title}</DialogTitle>
                <div>
                    <div>{desc}</div>
                    <div className="grid grid-cols-2 w-full mt-10 gap-2">
                        <Button buttonName={"Cancel"} className={"w-full "} handleButtonClick={() => setOpen(false)} icon={""} />
                        <Button type="submit" buttonName="Confirm" handleButtonClick={() => { handleDelete() }} className={"w-full bg-red-600 border-red-600 hover:text-red-600"} icon={""} />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
