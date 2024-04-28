import CustomSelect from "@/ui/CustomSelect";
import InputField from "@/ui/InputField";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";

export default function Pagination({ totalPage = "", setPageSize, page, setPage }) {
    console.log("totalPage", totalPage)
    const options = [
        {
            value: "10",
            label: "10 items"
        },
        {
            value: "20",
            label: "20 items"
        },
        {
            value: "30",
            label: "30 items"
        },
        {
            value: "40",
            label: "40 items"
        },
    ]
    return (
        <div className="flex items-center gap-3 text-[#344054] font-normal text-sm">
            <CustomSelect className={"w-[100px] h-7"} setSelectedField={setPageSize} options={options} label={""} placeholder={"10 items"} />
            {/* <InputField type={"number"} placeholder={""} defaultValue={"1"} setSearchText={setPage} classname={"max-w-[60px] h-7"} defaultValue={undefined} required={undefined} label={undefined} /> */}
            <p>Page {page}  of  {totalPage}</p>
            <div className="flex items-center gap-2 cursor-pointer">
                <div onClick={() => page > 1 && setPage(page - 1)} className="border px-3 py-1 rounded  hover:bg-gray-100">
                    <FaArrowLeft />
                </div>
                <div onClick={() => totalPage > page && setPage(page + 1)} className="border px-3 py-1 rounded  hover:bg-gray-100">
                    <FaArrowRight />
                </div>
            </div>

        </div>
    )
}
