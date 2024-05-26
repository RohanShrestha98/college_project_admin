import { ReactTable } from "@/components/Table"
import { useCategoryData, useOrderProductData, useProductData, useTrackOrderData } from "@/hooks/useQueryData"
import { ConvertHtmlToPlainText } from "@/utils/convertHtmlToPlainText"
import moment from "moment"
import { useMemo } from "react"

export default function Dashboard() {
    const { data } = useProductData()
    const { data: orderData } = useOrderProductData()
    const { data: categoryData } = useCategoryData()
    const { data: delivaredData } = useTrackOrderData()


    const filterData = (data) => {
        return data?.filter((item) => item?.categoryField && item?.isRohan)
    }

    const filterDeliveredData = orderData?.data?.filter((item) => item?.status !== "Delivered" && item?.categoryField)
    const dashboardData = [
        {
            label: "Total Products",
            value: filterData(data?.data)?.length
        },
        {
            label: "Total Order",
            value: filterDeliveredData?.length
        },
        {
            label: "Total Delevared",
            value: delivaredData?.data?.length
        },
        {
            label: "Total Category",
            value: categoryData?.data?.length
        },
    ]
    const ordercolumns = [
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
                    <div className="relative w-[90px] cursor-pointer">
                        <p className={`w-[90px] ${(info?.row?.original?.status === "Pending" || info?.row?.original?.status === "pending") ? "bg-yellow-500 " : "bg-green-500 "}text-center py-1 rounded-full text-white `}>
                            {info?.row?.original?.status}
                        </p>
                    </div>


                )
            },
            header: () => <span>Status</span>,
            footer: props => props.column.id,
        },
    ]
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
                accessorFn: row => row?.inStock,
                id: "inStock",
                cell: info => {
                    return (
                        <p className={`w-[90px] ${info?.row?.original?.inStock ? "bg-green-500 " : "bg-red-500 "}text-center flex items-center gap-1 justify-center py-1 rounded-full text-white `}>
                            {info?.row?.original?.inStock && info?.row?.original?.inStockCount}
                            {info?.row?.original?.inStock ? " in stock" : " Out of Stock"}
                        </p>
                    )
                },
                header: () => <span>Stock</span>,
                footer: props => props.column.id,
            },
        ],
        [],
    );

    return (
        <div className=" m-6">
            <div className="grid grid-cols-4 gap-6">

                {
                    dashboardData?.map((item) => {
                        return <div key={item?.value} className="flex flex-col gap-1 items-center py-4  bg-white shadow-md rounded-[10px]">
                            <p className="font-semibold text-gray-800">
                                {
                                    item?.label
                                }
                            </p>
                            <p className="font-semibold text-gray-500">{item?.value}</p>
                        </div>
                    })
                }
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
                <div className=" ">
                    <h1 className="font-semibold">Recent Order</h1>
                    <ReactTable
                        columns={ordercolumns}
                        data={filterDeliveredData?.slice(0, 5) ?? []}
                        currentPage={1}
                        totalPage={1}
                    />
                </div>
                <div className=" ">
                    <h1 className="font-semibold">Product History</h1>
                    <ReactTable
                        columns={columns}
                        data={filterData(data?.data)?.slice(0, 5) ?? []}
                        currentPage={1}
                        totalPage={1}
                    />
                </div>
            </div>
        </div>
    )
}
