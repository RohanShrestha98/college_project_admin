import CustomSelect from "@/ui/CustomSelect";
import InputField from "@/ui/InputField";
import Pagination from "./Pagination";

export default function SearchPagination({ options, page, totalPage, inputPlaceholder, setPage, selectPlaceholder, setPageSize, setSelectedField, setSearchText, select = true, input = true }) {
    return (
        <div className="flex items-center justify-between border-t border-l border-r bg-white py-5 px-3 rounded-t-xl">
            {/* <div className="flex items-center gap-2">
                {input && <InputField setSearchText={setSearchText} placeholder={inputPlaceholder} classname={"w-[220px]"} defaultValue={undefined} required={undefined} label={undefined} />}
                {select && <CustomSelect className={"w-[220px]"} options={options} label={""} placeholder={selectPlaceholder} setSelectedField={setSelectedField} />}
            </div>
            <Pagination setPageSize={setPageSize} totalPage={totalPage ?? "1"} page={page} setPage={setPage} /> */}
        </div>
    )
}
