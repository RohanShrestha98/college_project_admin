import SearchPagination from "@/components/SearchPagination";
import { ReactTable } from "../../components/Table";
import { useMemo, useState } from "react";
import { useOrderProductData } from "@/hooks/useQueryData";
import { ConvertHtmlToPlainText } from "@/utils/convertHtmlToPlainText";
import { useNavigate } from "react-router-dom";
import moment from "moment";


export default function OrderProduct() {
    const [searchText, setSearchText] = useState("")
    const [selectedField, setSelectedField] = useState("")
    const [pageSize, setPageSize] = useState("10")
    const [page, setPage] = useState(1)
    const { data, isLoading, isError } = useOrderProductData()

    console.log("data", data)


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
                id: "name",
                cell: info => {
                    return (
                        <div className="flex items-center gap-1">
                            {
                                info?.row?.original?.images?.[0]?.url ? <img className="h-8 w-8 object-cover rounded-full" src={info?.row?.original?.images?.[0]?.url} alt="" />
                                    : <div className="min-h-8 min-w-8 rounded-full bg-gray-100"></div>
                            }
                            <p className="flex items-center gap-1 line-clamp-1">
                                {info?.row?.original?.name ?? "-"}
                            </p>
                        </div>

                    )
                },
                header: () => <span>Product Name</span>,
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
            // {
            //     accessorFn: row => row?.category,
            //     id: "category",
            //     cell: info => {
            //         const selectedCategory = categoryData?.data?.filter((item) => item?._id === info?.row?.original?.category)
            //         return (
            //             <p className="flex items-center gap-1">
            //                 {selectedCategory?.[0]?.title}
            //             </p>
            //         )
            //     },
            //     header: () => <span>Category</span>,
            //     footer: props => props.column.id,
            // },
            {
                accessorFn: row => row?.brand,
                id: "brand",
                header: () => <span>Brand</span>,
                footer: props => props.column.id,
            },
            {
                accessorFn: row => row?.price,
                id: "price",
                cell: info => {
                    return (
                        <p className="flex items-center gap-1">
                            Rs {info?.row?.original?.price}
                        </p>
                    )
                },
                header: () => <span>Price</span>,
                footer: props => props.column.id,
            },
            {
                accessorFn: row => row?.createdAt,
                id: "createdAt",
                cell: info => {
                    return (
                        <p className="flex items-center gap-1">
                            {moment(info?.row?.original?.createdAt).format("MMM Do YYYY, h:mm:ss a")}
                        </p>
                    )
                },
                header: () => <span>Publish date</span>,
                footer: props => props.column.id,
            },
            {
                accessorFn: row => row?.count,
                id: "count",
                header: () => <span>No of items</span>,
                footer: props => props.column.id,
            },
            {
                accessorFn: row => row?.status,
                id: "status",
                cell: info => {
                    return (
                        <p className={`w-[90px] ${info?.row?.original?.status === "pending" ? "bg-yellow-500 " : "bg-green-500 "}text-center py-1 rounded-full text-white `}>
                            {info?.row?.original?.status}
                        </p>
                    )
                },
                header: () => <span>Status</span>,
                footer: props => props.column.id,
            },

            // {
            //     accessorFn: row => row,
            //     id: "action",
            //     cell: (info) => {
            //         return (
            //             <div className="flex gap-2 text-base justify-center">
            //                 <FiEdit2 onClick={() => navigate("/add-product", { state: info?.row?.original })} className="text-[#1b1b1b] cursor-pointer" />
            //                 <DeleteModal asChild desc={"Are you sure you want to delete this product ?"} title={"Delete Product"} id={info?.row?.original?._id}>
            //                     <FaRegTrashCan className="text-red-600 cursor-pointer" />
            //                 </DeleteModal>
            //             </div>
            //         );
            //     },
            //     header: () => <span className='flex justify-center'>Action</span>,
            //     footer: props => props.column.id,
            // },
        ],
        [],
    );



    return (
        <div className="p-4 flex flex-col gap-4">
            <div>
                <SearchPagination totalPage={data?.totalPage} input={false} select={false} setPage={setPage} page={page} setPageSize={setPageSize} setSelectedField={setSelectedField} inputPlaceholder={"Search Category"} setSearchText={setSearchText} />
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
