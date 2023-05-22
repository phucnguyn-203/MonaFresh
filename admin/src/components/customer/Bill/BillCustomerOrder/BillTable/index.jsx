import React from "react";

export default function BillTable({ columnData, rowData }) {
    return (
        <div className="w-full overflow-hidden border border-gray-200 rounded-lg ring-1 ring-black ring-opacity-5 mb-8 rounded-b-lg">
            <div className="w-full overflow-x-scroll">
                <table className="w-full whitespace-nowrap ">
                    <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b border-gray-20 bg-gray-100">
                        <tr>
                            <td className="px-4 py-3">STT</td>
                            {columnData.map((columnItem) => (
                                <td key={columnItem.field} className="px-4 py-3">
                                    {columnItem.headerName}
                                </td>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-10 text-gray-700">
                        {rowData.map((rowItem, index) => (
                            <tr key={rowItem.id}>
                                <td className="px-4 py-3 text-sm ">{index + 1}</td>
                                {columnData.map((columnItem) => (
                                    <td key={columnItem.field} className="px-4 py-3">
                                        {columnItem.renderCell ? (
                                            columnItem.renderCell(rowItem)
                                        ) : (
                                            <span className="text-sm">{rowItem[columnItem.field]}</span>
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
