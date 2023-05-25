import React, { useState } from "react";
import PageLayout from "../../components/layout/pageLayout";
import { IconAdd, IconDelete, IconBin, IconBack, IconRestore } from "../../components/icon";
import AddModalExport from "../../components/export/addModalExport";

export default function Export() {
  const [showModalExport, setShowModalExport] = useState(false);

  const handleShowModalExport = () => {
    setShowModalExport(!showModalExport);
  };
  return (
    <PageLayout title="Quản lý xuất hàng">
      <div className="bg-white rounded-lg ring-1 ring-gray-200 ring-opacity-4 overflow-hidden mb-5 shadow-xs">
        <div className="p-4">
          <div className="flex justify-end items-center py-3 gap-x-4">
            <React.Fragment>
              <button
                className={`h-12 align-bottom inline-flex leading-5 items-center justify-center 
                        transition-colors duration-150 font-medium px-10 py-2 rounded-lg text-sm 
                        text-white border border-transparent bg-yellow-400 cursor-pointer`}
              >
                <span className="mr-3">
                  <IconRestore />
                </span>
                Khôi phục
              </button>
            </React.Fragment>
            <React.Fragment>
              <button
                className={`h-12 align-bottom inline-flex leading-5 items-center justify-center 
                        transition-colors duration-150 font-medium px-10 py-2 rounded-lg text-sm 
                        text-white border border-transparent bg-red-600 cursor-pointer`}
              >
                <span className="mr-3">
                  <IconDelete />
                </span>
                Xoá
              </button>
            </React.Fragment>
            <React.Fragment>
              <button
                className="h-12 align-bottom inline-flex leading-5 items-center justify-center 
              cursor-pointer transition-colors duration-150 font-medium px-4 py-2 rounded-lg text-sm 
              text-white bg-primary border border-transparent hover:bg-emerald-700 "
                onClick={handleShowModalExport}
              >
                <span className="mr-3">
                  <IconAdd />
                </span>
                Xuất đơn hàng
              </button>
            </React.Fragment>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg ring-1 ring-gray-200 ring-opacity-4 overflow-hidden mb-5 shadow-xs">
        <div className="p-4">
          <div className="py-3 flex gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex">
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <input
                // value={searchKeyWord}
                className="block w-full h-12 px-3 py-1 text-sm focus:outline-none leading-5 
                        rounded-md focus:border-gray-200 border-gray-200 bg-gray-100 ring-1 ring-gray-200
                        focus:bg-white border-transparent"
                type="text"
                name="searchKeyWord"
                placeholder="Tìm theo mã đơn hàng"
                // onChange={(e) => setSearchKeyWord(e.target.value)}
              />
            </div>

            <button
              className="h-12 align-bottom inline-flex leading-5 items-center justify-center 
                        transition-colors duration-150 font-medium px-10 py-2 rounded-lg text-sm 
                        text-white bg-red-500 hover:bg-red-700 border border-transparent"
            >
              <span className="mr-3">
                <IconBin />
              </span>
              Thùng rác
            </button>
          </div>
        </div>
      </div>
      {showModalExport && (
        <AddModalExport closeModal={handleShowModalExport} title="PHIẾU XUẤT HÀNG" titleBtnFooter="LƯU" />
      )}
    </PageLayout>
  );
}
