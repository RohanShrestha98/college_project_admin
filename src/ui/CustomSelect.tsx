
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function CustomSelect({ options, label, isSearchPagination, placeholder, className, labelName, disabled, required, setSelectedField }) {
    return (
        <div>
            {labelName && <p className="text-[#344054] font-medium text-sm mb-1">{labelName}
                {required && <span className="text-red-600">*</span>} </p>
            }
            <Select onValueChange={(e) => {
                setSelectedField(e)
            }} disabled={disabled}>
                <SelectTrigger className={`w-[180px] border rounded-lg bg-white ${className}`}>
                    <SelectValue defaultValue={placeholder} placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent className="bg-white">
                    <SelectGroup>
                        <SelectLabel>{label}</SelectLabel>
                        {
                            options?.map((item) => {
                                return <SelectItem value={item?.value?.toString()}>{item?.label}</SelectItem>
                            })
                        }
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}