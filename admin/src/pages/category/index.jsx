import { useState } from "react";

import PageLayout from "../../components/layout/pageLayout";
import { IconDelete } from "../../components/icon";
import { IconAdd } from "../../components/icon";
import CategoryTable from "../../components/category/CategoryTable";
import AddCategoryModal from "../../components/category/AddCategoryModal";

export default function Category() {
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const handleShowCategoryModal = () => {
    setShowAddCategoryModal(!showAddCategoryModal);
  };
  return (
    <PageLayout title="Danh mục">
      <div className="bg-white rounded-lg ring-1 ring-gray-200 ring-opacity-4 overflow-hidden mb-5 shadow-xs">
        <div className="p-4">
          <div className="flex justify-end items-center py-3 gap-x-4">
            <button
              className="h-12 align-bottom inline-flex leading-5 items-center justify-center 
                        transition-colors duration-150 font-medium px-10 py-2 rounded-lg text-sm 
                        text-white bg-red-300 cursor-not-allowed border border-transparent"
            >
              <span className="mr-3">
                <IconDelete />
              </span>
              Xoá
            </button>
            <button
              className="h-12 align-bottom inline-flex leading-5 items-center justify-center 
                        cursor-pointer transition-colors duration-150 font-medium px-4 py-2 rounded-lg text-sm 
                        text-white bg-primary border border-transparent hover:bg-emerald-700 "
              onClick={handleShowCategoryModal}
            >
              <span className="mr-3">
                <IconAdd />
              </span>
              Thêm danh mục
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg ring-1 ring-gray-200 ring-opacity-4 overflow-hidden mb-5 shadow-xs">
        <div className="p-4">
          <form className="py-3 grid gap-4 ">
            <div className="flex-grow-0">
              <input
                type="search"
                placeholder="Nhập tên danh mục"
                className="block w-full px-3 py-1 text-sm focus:outline-none leading-5 rounded-md focus:border-gray-200 border-gray-200 border h-12 bg-gray-100 border-transparent focus:bg-white"
              />
            </div>
          </form>
        </div>
      </div>
      <CategoryTable />
      {showAddCategoryModal && (
        <AddCategoryModal
          closeModal={handleShowCategoryModal}
          title="THÊM DANH MỤC SẢN PHẨM"
          titleBtnFooter="THÊM DANH MỤC"
        />
      )}
    </PageLayout>
  );
}
