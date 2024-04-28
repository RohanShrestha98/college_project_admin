import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter"

export default function InputField({ type = "text", placeholder = "", className = "", defaultValue = "", required = false, label = "", register = () => { }, name = "", setSearchText = () => { } }) {
    const capatalizeLabel = capitalizeFirstLetter(label)
    return (
        <div>
            {
                label && <p className="text-[#344054] font-medium text-sm mb-1">{capatalizeLabel} {required && <span className="text-red-600">*</span>} </p>
            }
            <input
                placeholder={placeholder}
                onChange={(e) => setSearchText(e.target.value)}
                defaultValue={defaultValue}
                {...register(name)}
                type={type}
                style={{ borderRadius: "6px" }}
                className={
                    `flex h-8 w-full border  border-gray-300 rounded-lg bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50
                   ${className}`
                }
            />
        </div>
    )
}
