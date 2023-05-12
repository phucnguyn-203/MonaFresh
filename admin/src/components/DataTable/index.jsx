import React from "react";
import { IconPrevious, IconNext } from "../icon";
import styles from "./styles.module.css";

function DataTable({
  columnData,
  rowData = [],
  select = false,
  isSelectAll = false,
  isSelected = [],
  handleSelected,
  handleSelectAll,
}) {
  return (
    <React.Fragment>
      {rowData.length === 0 ? (
        <h1 className="text-center">Không có dữ liệu</h1>
      ) : (
        <div className="w-full overflow-hidden border border-gray-200 rounded-lg ring-1 ring-black ring-opacity-5 mb-8 rounded-b-lg">
          <div className="w-full overflow-x-scroll">
            <table className="w-full whitespace-nowrap ">
              <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b border-gray-20 bg-gray-100">
                <tr>
                  {select ? (
                    <td className="px-4 py-3">
                      <input
                        id="selectAll"
                        name="selectAll"
                        type="checkbox"
                        checked={isSelectAll}
                        onChange={handleSelectAll}
                        disabled={rowData.length === 0}
                      />
                    </td>
                  ) : null}
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
                  <tr key={rowItem._id}>
                    {select ? (
                      <td className="px-4 py-3">
                        <input
                          id={rowItem._id}
                          name={rowItem.name}
                          type="checkbox"
                          onChange={(event) => handleSelected(event)}
                          checked={isSelected.includes(rowItem._id)}
                        />
                      </td>
                    ) : null}
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
          <div className="px-4 py-3 bg-white border-t border-gray-200 text-gray-500">
            <div className="flex items-center justify-between">
              <p className="flex items-center font-semibold tracking-wide uppercase text-xs">Hiển thị 1-10 trên 100</p>

              <ul className={`flex justify-end items-center ${styles.pagination}`}>
                <li>
                  <button className="text-base px-[10px] h-3 ">
                    <IconPrevious />
                  </button>
                </li>
                <li>
                  <a className={styles.currentNumberPage}>1</a>
                </li>
                <li>
                  <a>2</a>
                </li>
                <li>
                  <a>3</a>
                </li>
                <li>
                  <a>...</a>
                </li>
                <li>
                  <button className="text-base px-[10px] h-3">
                    <IconNext />
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default React.memo(DataTable);
