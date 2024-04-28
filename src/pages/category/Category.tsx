import SearchPagination from "@/components/SearchPagination";
import { ReactTable } from "../../components/Table";
import { useMemo, useState } from "react";
import TopButton from "@/components/TopButton";
import { useCategoryData } from "@/hooks/useQueryData";
import { FiEdit2 } from "react-icons/fi";
import { FaRegTrashCan } from "react-icons/fa6";
import { ConvertHtmlToPlainText } from "@/utils/convertHtmlToPlainText";
import AddCategoryModal from "./AddCategoryModal";
import DeleteModal from "@/components/DeleteModal";

export default function Category() {
    const [searchText, setSearchText] = useState("")
    const [selectedField, setSelectedField] = useState("")
    const [pageSize, setPageSize] = useState("10")
    const [page, setPage] = useState(1)
    const { data, isLoading, isError } = useCategoryData()
    const columns = useMemo(
        () => [
            {
                accessorFn: row => row?.courseID,
                id: "id",
                cell: info => {
                    return (
                        <p >
                            {info?.row?.index + 1 + " ."}
                        </p>
                    )
                },
                header: () => <span>SN.</span>,
                footer: props => props.column.id,
            },
            {
                accessorFn: row => row?.name,
                id: "category",
                cell: info => {
                    return (
                        <div className="flex items-center gap-1">
                            {
                                info?.row?.original?.thumbnail?.url ? <img className="h-8 w-8 object-cover rounded-full" src={info?.row?.original?.thumbnail?.url} alt="" />
                                    : <div className="min-h-8 min-w-8 rounded-full bg-gray-100"></div>
                            }
                            <p className="flex items-center gap-1 line-clamp-1">
                                {info?.row?.original?.title ?? "-"}
                            </p>
                        </div>

                    )
                },
                header: () => <span>Category Name</span>,
                footer: props => props.column.id,
            },

            {
                accessorFn: row => row?.description,
                id: "duration",
                cell: info => {
                    return (
                        <p className="flex items-center gap-1">
                            {ConvertHtmlToPlainText(info?.row?.original?.description?.slice(0, 50))}
                        </p>
                    )
                },
                header: () => <span>Description</span>,
                footer: props => props.column.id,
            },
            {
                accessorFn: row => row,
                id: "action",
                cell: (info) => {
                    return (
                        <div className="flex gap-2 text-base justify-center">
                            {/* <AddCategoryModal asChild edit editData={info?.row?.original}> */}
                            <FiEdit2 className="text-[#1b1b1b] cursor-pointer" />
                            {/* </AddCategoryModal> */}
                            <DeleteModal asChild desc={"Are you sure you wanna delete this category"} title={"Delete Category"} id={info?.row?.original?._id}>
                                <FaRegTrashCan className="text-red-600 cursor-pointer" />
                            </DeleteModal>
                        </div>
                    );
                },
                header: () => <span className='flex justify-center'>Action</span>,
                footer: props => props.column.id,
            },
        ],
        [],
    );

    return (
        <div className="p-4 flex flex-col gap-4">
            <div className="flex justify-end">
                <AddCategoryModal asChild>
                    <div>
                        <TopButton buttonName={"Add Category"} className={""} handleButtonClick={() => { }} />
                    </div>
                </AddCategoryModal>
            </div>
            <div>
                <SearchPagination totalPage={data?.totalPage} select={false} setPage={setPage} page={page} setPageSize={setPageSize} setSelectedField={setSelectedField} inputPlaceholder={"Search Category"} setSearchText={setSearchText} />
                <ReactTable
                    isLoading={isLoading}
                    isError={isError}
                    columns={columns}
                    data={data?.data ?? []}
                    currentPage={1}
                    totalPage={1}
                />
            </div>
        </div>
    )
}
