import React from "react";
import { useEffect, useImperativeHandle } from "react";

import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";

const ReactTable = React.forwardRef(
    (
        {
            columns,
            data,
            isLoading = false,
            isError,
            setSelectedRows,
            rowSelectable,
        },
        ref,
    ) => {
        const [rowSelection, setRowSelection] = React.useState({});
        const table = useReactTable({
            data,
            columns,
            state: {
                rowSelection,
            },
            enableRowSelection: true,
            onRowSelectionChange: setRowSelection,
            getCoreRowModel: getCoreRowModel(),
            getFilteredRowModel: getFilteredRowModel(),
            getPaginationRowModel: getPaginationRowModel(),
            debugTable: true,
            manualPagination: true,
        });

        useImperativeHandle(ref, () => ({
            clearSelection() {
                table.toggleAllRowsSelected(false);
            },
        }));

        useEffect(() => {
            const handleSelectedId = () => {
                const newData =
                    data?.length > 0 &&
                    setSelectedRows &&
                    table
                        ?.getSelectedRowModel()
                        ?.flatRows?.map(
                            item => item?.original?.id || item?.original?.student?.id,
                        );
                setSelectedRows && setSelectedRows(newData);
            };
            handleSelectedId();
        }, [table?.getSelectedRowModel()]);

        return (
            <div className=" overflow-auto no-scrollbar border">
                <table className="w-full">
                    <thead className="border-b-[1px] border-white4">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id} >
                                {headerGroup.headers.map(header => {
                                    return (
                                        <th
                                            key={header.id}
                                            colSpan={header.colSpan}
                                            className="px-3 bg-[#F9FAFB] py-2 text-left table_header  font-medium text-sm  text-slate-800"
                                        >
                                            {header.isPlaceholder ? null : (
                                                <>
                                                    {flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext(),
                                                    )}
                                                </>
                                            )}
                                        </th>
                                    );
                                })}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="bg-white">
                        {isLoading ? <>Loading...</> : isError ? <>Error</> : data?.length > 0 ?
                            table?.getRowModel()?.rows?.map((row, index) => {
                                return (
                                    <tr key={row.id} className="">
                                        {row?.getVisibleCells()?.map(cell => {
                                            return (
                                                <td
                                                    key={cell.id}
                                                    className={`px-3 py-3 text-[#374253] font-normal text-xs text-gray1  ${index % 2 === 0 ? "text-gray1" : "text-gray1"
                                                        }`}
                                                >
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext(),
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            }) : <>Empty</>}
                    </tbody>
                </table>
                {data && (
                    <div
                        className={`flex ${rowSelectable ? "justify-between" : "justify-end"
                            }  items-center px-4 py-4 text-gray1 text-xs`}
                    >
                        {rowSelectable && (
                            <p>{Object?.keys(rowSelection)?.length} Rows Selected</p>
                        )}
                    </div>
                )}
            </div>
        );
    },
);

ReactTable.displayName = "ReactTable";

export { ReactTable };