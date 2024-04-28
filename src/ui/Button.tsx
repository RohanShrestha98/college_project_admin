import { Button as ShadcnButton } from "@/components/ui/button"

export default function Button({ buttonName, className, handleButtonClick, icon, danger = false, type }) {
    return (
        <div>
            <ShadcnButton onClick={handleButtonClick} type={type} className={`${danger ? "border border-red-600  text-red-600 hover:bg-red-600 hover:text-white" : "bg-[#1b1b1b] text-white hover:bg-white border border-[#1b1b1b] hover:text-[#1b1b1b]"} flex items-center gap-1 h-8 rounded  ${className}`}>{icon}{buttonName}</ShadcnButton>
        </div>
    )
}
