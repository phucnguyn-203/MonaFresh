import { useState, useEffect } from "react";
import categoryAPI from "../../api/categoryAPI";
import PageLayout from "../../components/layout/pageLayout";
import { IconDelete } from "../../components/icon";
import { IconAdd } from "../../components/icon";
import CategoryTable from "../../components/category/CategoryTable";
import AddCategoryModal from "../../components/category/AddCategoryModal";
import EditCategoryModal from "../../components/category/EditCategoryModal";

export default function Category() {
  const [isShowAddCategoryModal, setIsShowAddCategoryModal] = useState(false);
  const [isShowEditCategoryModal, setIsShowEditCategoryModal] = useState(false);
  const [editData, setEditData] = useState();
  const [categories, setCategories] = useState([]);

  const getAllCategory = async () => {
    try {
      const response = await categoryAPI.getAllCategory();
      setCategories(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddCategory = async (data) => {
    const { name } = data;
    try {
      await categoryAPI.addCategory({ name });
      setIsShowAddCategoryModal(false);
      getAllCategory();
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateCategory = async (id, data) => {
    try {
      await categoryAPI.updateCategory(id, data);
      setIsShowEditCategoryModal(false);
      getAllCategory();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await categoryAPI.deleteCategory(id);
      getAllCategory();
    } catch (err) {
      console.log(err);
    }
  };

  const handleShowAddCategoryModal = () => {
    setIsShowAddCategoryModal(!isShowAddCategoryModal);
  };

  const handleShowEditCategoryModal = (item) => {
    setIsShowEditCategoryModal(!isShowEditCategoryModal);
    setEditData(item);
  };

  useEffect(() => {
    getAllCategory();
  }, []);

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
              onClick={handleShowAddCategoryModal}
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
      <CategoryTable
        categories={categories}
        handleDeleteCategory={handleDeleteCategory}
        handleShowEditCategoryModal={handleShowEditCategoryModal}
        handleUpdateCategory={handleUpdateCategory}
      />
      {isShowAddCategoryModal && (
        <AddCategoryModal
          title="THÊM DANH MỤC SẢN PHẨM"
          titleBtnFooter="THÊM DANH MỤC"
          handleAddCategory={handleAddCategory}
          closeModal={handleShowAddCategoryModal}
        />
      )}
      {isShowEditCategoryModal && (
        <EditCategoryModal
          title="Cập nhật danh mục sản phẩm"
          titleBtnFooter="CẬP NHẬT"
          closeModal={handleShowEditCategoryModal}
          category={editData}
          handleUpdateCategory={handleUpdateCategory}
        />
      )}
    </PageLayout>
  );
}
