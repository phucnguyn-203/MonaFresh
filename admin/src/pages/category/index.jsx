import React, { useState, useEffect } from "react";
import useDebounce from "../../hooks/useDebounce";
import categoryAPI from "../../api/categoryAPI";
import PageLayout from "../../components/layout/pageLayout";
import { IconAdd, IconDelete, IconBin, IconBack, IconRestore } from "../../components/icon";
import CategoryTable from "../../components/category/CategoryTable";
import AddCategoryModal from "../../components/category/AddCategoryModal";
import EditCategoryModal from "../../components/category/EditCategoryModal";
import Swal from "sweetalert2";
import CategoryDeletedTable from "../../components/category/CategoryDeletedTable";

export default function Category() {
  const [isShowAddCategoryModal, setIsShowAddCategoryModal] = useState(false);
  const [isShowEditCategoryModal, setIsShowEditCategoryModal] = useState(false);
  const [editData, setEditData] = useState();
  const [categories, setCategories] = useState([]);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [isSelected, setIsSelected] = useState([]);
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const debounceValue = useDebounce(searchKeyWord, 500);
  const [isShowCategoryDeletedTable, setIsShowCategoryDeletedTable] = useState(false);
  //
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [limitPerPage, setLimitPerPage] = useState(10);

  // const handleSoftDeleteProduct = async (category) => {
  //   try {
  //     await productAPI.updateProduct(category, { isActive: false });

  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // const handleSoftDeleteManyProduct = async () => {
  //   try {
  //     await productAPI.updateManyProduct({productIds: isSelected, isActive: false});
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  useEffect(() => {
    getAllCategory();
  }, [debounceValue, isShowCategoryDeletedTable, currentPage, limitPerPage]);

  const handleSelectAll = () => {
    setIsSelectAll(!isSelectAll);
    setIsSelected(categories.map((category) => category._id));
    if (isSelectAll) {
      setIsSelected([]);
    }
  };

  const handleSelected = (event) => {
    const { id, checked } = event.target;
    setIsSelected([...isSelected, id]);
    if (!checked) {
      setIsSelected(isSelected.filter((categoryId) => categoryId !== id));
    }
  };

  const getAllCategory = async () => {
    let params = { page: currentPage, limit: limitPerPage };
    if (debounceValue) {
      params.search = debounceValue.trim();
    }
    if (isShowCategoryDeletedTable) {
      params.isActive = false;
    } else {
      params.isActive = true;
    }
    try {
      const response = await categoryAPI.getAllCategory(params);
      if (response.data.length === 0 && response.currentPage !== 1) {
        setCurrentPage(response.currentPage - 1);
      }
      setCategories(response.data);
      setTotalPageCount(response.totalPages);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddCategory = async (data) => {
    const { name } = data;
    await categoryAPI.createCategory({ name });
    await getAllCategory();
    setIsShowAddCategoryModal(false);
  };

  const handleUpdateCategory = async (id, data) => {
    await categoryAPI.updateCategory(id, data);
    await getAllCategory();
    setIsShowEditCategoryModal(false);
  };

  const handleDeleteCategory = async (id) => {
    try {
      await categoryAPI.deleteCategory(id);
      getAllCategory();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteManyCategory = async () => {
    try {
      await categoryAPI.deleteManyCategory(isSelected);
      getAllCategory();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSoftDeleteCategory = async (id) => {
    try {
      await categoryAPI.updateCategory(id, { isActive: false });
      getAllCategory();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSoftDeleteManyCategory = async () => {
    try {
      await categoryAPI.updateManyCategory({ categoryIds: isSelected, isActive: false });
      getAllCategory();
    } catch (err) {
      console.log(err);
    }
  };

  const handleRestoreCategory = async (id) => {
    try {
      await categoryAPI.updateCategory(id, { isActive: true });
      getAllCategory();
    } catch (err) {
      console.log(err);
    }
  };

  const handleRestoreManyCategory = async () => {
    try {
      await categoryAPI.updateManyCategory({ categoryIds: isSelected, isActive: true });
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
  const handleShowDeletedTable = () => {
    setIsShowCategoryDeletedTable(!isShowCategoryDeletedTable);
  };

  return (
    <PageLayout title="Danh mục">
      <div className="bg-white rounded-lg ring-1 ring-gray-200 ring-opacity-4 overflow-hidden mb-5 shadow-xs">
        <div className="p-4">
          <div className="flex justify-end items-center py-3 gap-x-4">
            {isShowCategoryDeletedTable ? (
              <React.Fragment>
                <button
                  disabled={isSelected.length <= 0}
                  onClick={() => {
                    Swal.fire({
                      title: "Bạn chắc chắn muốn khôi phục?",
                      text: "Các danh mục sẽ được khôi phục.",
                      icon: "question",
                      showCancelButton: true,
                      confirmButtonColor: "#0E9F6E",
                      cancelButtonColor: "#d33",
                      cancelButtonText: "Huỷ bỏ",
                      confirmButtonText: "Đồng ý!",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        handleRestoreManyCategory();
                        Swal.fire({
                          title: "Đã Khôi phục",
                          text: "Các sản phẩm đã được khôi phục.",
                          confirmButtonColor: "#0E9F6E",
                        });
                      }
                    });
                  }}
                  className={`h-12 align-bottom inline-flex leading-5 items-center justify-center 
                        transition-colors duration-150 font-medium px-10 py-2 rounded-lg text-sm 
                        text-white border border-transparent ${
                          isSelected.length > 0 ? "bg-yellow-400 cursor-pointer" : "bg-yellow-200 cursor-not-allowed"
                        }`}
                >
                  <span className="mr-3">
                    <IconRestore />
                  </span>
                  Khôi phục
                </button>

                <button
                  disabled={isSelected.length <= 0}
                  onClick={() => {
                    Swal.fire({
                      title: "Bạn chắc chắn muốn xoá?",
                      text: "Các danh mục và sản phẩm thuộc danh mục sẽ được xoá và không thể khôi phục.",
                      icon: "question",
                      showCancelButton: true,
                      confirmButtonColor: "#0E9F6E",
                      cancelButtonColor: "#d33",
                      cancelButtonText: "Huỷ bỏ",
                      confirmButtonText: "Đồng ý!",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        handleDeleteManyCategory();
                        Swal.fire({
                          title: "Đã xoá",
                          text: "Các danh mục và sản phẩm thuộc doanh mục đã được xoá.",
                          confirmButtonColor: "#0E9F6E",
                        });
                      }
                    });
                  }}
                  className={`h-12 align-bottom inline-flex leading-5 items-center justify-center 
                        transition-colors duration-150 font-medium px-10 py-2 rounded-lg text-sm 
                        text-white border border-transparent ${
                          isSelected.length > 0 ? "bg-red-600 cursor-pointer" : "bg-red-300 cursor-not-allowed"
                        }`}
                >
                  <span className="mr-3">
                    <IconDelete />
                  </span>
                  Xoá
                </button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <button
                  disabled={isSelected.length <= 0}
                  onClick={() => {
                    Swal.fire({
                      title: "Bạn chắc chắn muốn xoá?",
                      text: "Các danh mục và sản phẩm thuộc danh mục sẽ được chuyển vào thùng rác.",
                      icon: "question",
                      showCancelButton: true,
                      confirmButtonColor: "#0E9F6E",
                      cancelButtonColor: "#d33",
                      cancelButtonText: "Huỷ bỏ",
                      confirmButtonText: "Đồng ý!",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        handleSoftDeleteManyCategory();
                        Swal.fire({
                          title: "Đã chuyển vào thùng rác",
                          text: "Các danh mục và sản phẩm thuộc danh mục đã được chuyển vào thùng rác.",
                          confirmButtonColor: "#0E9F6E",
                        });
                      }
                    });
                  }}
                  className={`h-12 align-bottom inline-flex leading-5 items-center justify-center 
                        transition-colors duration-150 font-medium px-10 py-2 rounded-lg text-sm 
                        text-white border border-transparent ${
                          isSelected.length > 0 ? "bg-red-600 cursor-pointer" : "bg-red-300 cursor-not-allowed"
                        }`}
                >
                  <span className="mr-3">
                    <IconDelete />
                  </span>
                  Xoá
                </button>
              </React.Fragment>
            )}

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
          <div className="py-3 flex gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex">
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow ">
              <input
                className="block w-full h-12 px-3 py-1 text-sm focus:outline-none leading-5 
                        rounded-md focus:border-gray-200 border-gray-200 bg-gray-100 ring-1 ring-gray-200
                        focus:bg-white border-transparent"
                type="text"
                placeholder="Tìm theo tên danh mục"
                onChange={(e) => setSearchKeyWord(e.target.value)}
              />
            </div>
            {isShowCategoryDeletedTable ? (
              <button
                className="h-12 align-bottom inline-flex leading-5 items-center justify-center 
                          transition-colors duration-150 font-medium px-10 py-2 rounded-lg text-sm 
                          text-white  bg-primary border border-transparent hover:bg-emerald-700"
                onClick={() => {
                  handleShowDeletedTable();
                  setIsSelected([]);
                  setIsSelectAll(false);
                }}
              >
                <span className="mr-3">
                  <IconBack />
                </span>
                Quay lại
              </button>
            ) : (
              <button
                className="h-12 align-bottom inline-flex leading-5 items-center justify-center 
                        transition-colors duration-150 font-medium px-10 py-2 rounded-lg text-sm 
                        text-white bg-red-500 hover:bg-red-700 border border-transparent"
                onClick={() => {
                  handleShowDeletedTable();
                  setIsSelected([]);
                  setIsSelectAll(false);
                }}
              >
                <span className="mr-3">
                  <IconBin />
                </span>
                Thùng rác
              </button>
            )}
          </div>
        </div>
      </div>
      {/* <div className="flex justify-end mb-5 px-[20px]">
        
      </div> */}
      {isShowCategoryDeletedTable ? (
        <React.Fragment>
          <h1 className="text-black font-bold mb-5">Thùng rác</h1>
          <CategoryDeletedTable
            categories={categories}
            handleDeleteCategory={handleDeleteCategory}
            handleRestoreCategory={handleRestoreCategory}
            handleSelected={handleSelected}
            isSelected={isSelected}
            handleSelectAll={handleSelectAll}
            isSelectAll={isSelectAll}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPageCount={totalPageCount}
            limitPerPage={limitPerPage}
            setLimitPerPage={setLimitPerPage}
          />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <h1 className="text-black font-bold mb-5">Danh sách</h1>
          <CategoryTable
            categories={categories}
            handleSoftDelete={handleSoftDeleteCategory}
            handleShowEditCategoryModal={handleShowEditCategoryModal}
            isSelectAll={isSelectAll}
            isSelected={isSelected}
            handleSelectAll={handleSelectAll}
            handleSelected={handleSelected}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPageCount={totalPageCount}
            limitPerPage={limitPerPage}
            setLimitPerPage={setLimitPerPage}
          />
        </React.Fragment>
      )}

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
