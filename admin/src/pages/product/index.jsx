import React, { useState, useEffect } from "react";
import useDebounce from "../../hooks/useDebounce";
import { IconAdd, IconDelete, IconBin, IconBack, IconRestore } from "../../components/icon";
import PageLayout from "../../components/layout/pageLayout";
import AddProductModal from "../../components/product/AddProductModal";
import EditProductModal from "../../components/product/EditProductModal";
import ProductTable from "../../components/product/ProductTable";
import productAPI from "../../api/productAPI";
import categoryAPI from "../../api/categoryAPI";
import Swal from "sweetalert2";
import ProductDeletedTable from "../../components/product/ProductDetetedTable";

export default function Product() {
  const [isShowAddProductModal, setIsShowAddProductModal] = useState(false);
  const [isShowEditProductModal, setIsShowEditProdcutModal] = useState(false);
  const [editProductData, setEditProductData] = useState();
  const [filterByCategory, setFilterByCategory] = useState("");
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [isSelected, setIsSelected] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sortValue, setSortValue] = useState("");
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const debounceValue = useDebounce(searchKeyWord, 500);
  const [isShowProductDeletedTable, setIsShowProductDeletedTable] = useState(false);
  //
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [limitPerPage, setLimitPerPage] = useState(10);

  useEffect(() => {
    getAllProduct();
  }, [debounceValue, filterByCategory, sortValue, isShowProductDeletedTable, currentPage, limitPerPage]);

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleSelectAll = () => {
    setIsSelectAll(!isSelectAll);
    setIsSelected(products.map((product) => product._id));
    if (isSelectAll) {
      setIsSelected([]);
    }
  };

  const handleSelected = (event) => {
    const { id, checked } = event.target;
    setIsSelected([...isSelected, id]);
    if (!checked) {
      setIsSelected(isSelected.filter((productId) => productId !== id));
    }
  };

  const getAllProduct = async () => {
    let params = { page: currentPage, limit: limitPerPage };
    if (debounceValue) {
      params.search = debounceValue.trim();
    }
    if (filterByCategory) {
      params.category = filterByCategory;
    }
    if (sortValue) {
      params = { ...params, ...sortValue };
    }
    if (isShowProductDeletedTable) {
      params.isActive = false;
    } else {
      params.isActive = true;
    }
    try {
      const response = await productAPI.getAllProduct(params);
      if (response.data.length === 0 && response.currentPage !== 1) {
        setCurrentPage(response.currentPage - 1);
      }
      setProducts(response.data);
      setTotalPageCount(response.totalPages);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllCategory = async () => {
    try {
      const response = await categoryAPI.getAllCategory();
      setCategories(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddProduct = async (data) => {
    const {
      images,
      thumbnail,
      category,
      supplier,
      description,
      name,
      price,
      importPrice,
      quantity,
      percentageDiscount,
    } = data;
    await productAPI.createProduct({
      images,
      thumbnail,
      category,
      supplier,
      name,
      description,
      price,
      importPrice,
      quantity,
      percentageDiscount: percentageDiscount / 100,
    });
    await getAllProduct();
    setIsShowAddProductModal(false);
  };

  const handleUpdateProduct = async (id, data) => {
    await productAPI.updateProduct(id, { ...data, percentageDiscount: data.percentageDiscount / 100 });
    await getAllProduct();
    setIsShowEditProdcutModal(false);
  };

  const handleDeleteProduct = async (id) => {
    try {
      await productAPI.deleteProduct(id);
      getAllProduct();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteManyProduct = async () => {
    try {
      await productAPI.deleteManyProduct(isSelected);
      getAllProduct();
    } catch (err) {
      console.log(err);
    }
  };
  const handleSoftDelete = async (id) => {
    try {
      await productAPI.updateProduct(id, { isActive: false });
      getAllProduct();
    } catch (err) {
      console.log(err);
    }
  };
  const handleSoftDeleteMany = async () => {
    try {
      await productAPI.updateManyProduct({ productIds: isSelected, isActive: false });
      getAllProduct();
    } catch (err) {
      console.log(err);
    }
  };

  const handleRestoreProduct = async (id) => {
    try {
      await productAPI.updateProduct(id, { isActive: true });
      getAllProduct();
    } catch (err) {
      console.log(err);
    }
  };

  const handleRestoreMany = async () => {
    try {
      await productAPI.updateManyProduct({ productIds: isSelected, isActive: true });
      getAllProduct();
    } catch (err) {
      console.log(err);
    }
  };

  const handleShowAddProductModal = () => {
    setIsShowAddProductModal(!isShowAddProductModal);
  };
  const handleShowEditProduct = (item) => {
    setIsShowEditProdcutModal(!isShowEditProductModal);
    setEditProductData(item);
  };
  const handleShowDeletedTable = () => {
    setIsShowProductDeletedTable(!isShowProductDeletedTable);
  };
  return (
    <PageLayout title="Sản phẩm">
      <div className="bg-white rounded-lg ring-1 ring-gray-200 ring-opacity-4 overflow-hidden mb-5 shadow-xs">
        <div className="p-4">
          <div className="flex justify-end items-center py-3 gap-x-4">
            {isShowProductDeletedTable ? (
              <React.Fragment>
                <button
                  disabled={isSelected.length <= 0}
                  onClick={() => {
                    Swal.fire({
                      title: "Bạn chắc chắn muốn khôi phục?",
                      text: "Các sản phẩm sẽ được khôi phục",
                      icon: "question",
                      showCancelButton: true,
                      confirmButtonColor: "#0E9F6E",
                      cancelButtonColor: "#d33",
                      cancelButtonText: "Huỷ bỏ",
                      confirmButtonText: "Đồng ý!",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        handleRestoreMany();
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
                  <span className="mr-3 ">
                    <IconRestore />
                  </span>
                  Khôi phục
                </button>

                <button
                  disabled={isSelected.length <= 0}
                  onClick={() => {
                    Swal.fire({
                      title: "Bạn chắc chắn muốn xoá?",
                      text: "Các sản phẩm sẽ bị xoá và sẽ không thể khôi phục",
                      icon: "question",
                      showCancelButton: true,
                      confirmButtonColor: "#0E9F6E",
                      cancelButtonColor: "#d33",
                      cancelButtonText: "Huỷ bỏ",
                      confirmButtonText: "Đồng ý!",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        handleDeleteManyProduct();
                        Swal.fire({
                          title: "Đã xoá",
                          text: "Các sản phẩm đã được xoá.",
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
                      text: "Các sản phẩm sẽ được chuyển vào thùng rác",
                      icon: "question",
                      showCancelButton: true,
                      confirmButtonColor: "#0E9F6E",
                      cancelButtonColor: "#d33",
                      cancelButtonText: "Huỷ bỏ",
                      confirmButtonText: "Đồng ý!",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        handleSoftDeleteMany();
                        Swal.fire({
                          title: "Đã chuyển vào thùng rác",
                          text: "Các sản phẩm đã được chuyển vào thùng rác.",
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
              onClick={handleShowAddProductModal}
            >
              <span className="mr-3">
                <IconAdd />
              </span>
              Thêm sản phẩm
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
                placeholder="Tìm theo tên sản phẩm"
                onChange={(e) => setSearchKeyWord(e.target.value)}
              />
            </div>
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow ">
              <select
                defaultValue={filterByCategory}
                onChange={(e) => setFilterByCategory(e.target.value)}
                className="block w-full h-12 px-2 py-1 text-sm focus:outline-none leading-5 
                        rounded-md focus:border-gray-200 border-gray-200 bg-gray-100 ring-1 ring-gray-200
                        focus:bg-white border-transparent form-select "
              >
                <option value="">Danh Mục</option>
                {categories.map((item) => (
                  <option value={item._id} key={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow ">
              <select
                defaultValue={sortValue.value}
                onChange={(e) => {
                  if (e.target.value) {
                    setSortValue(JSON.parse(e.target.value));
                  } else {
                    setSortValue("");
                  }
                }}
                className="block w-full h-12 px-2 py-1 text-sm focus:outline-none leading-5 
                        rounded-md focus:border-gray-200 border-gray-200 bg-gray-100 ring-1 ring-gray-200
                        focus:bg-white border-transparent form-select "
              >
                <option value="" hidden="">
                  Sắp xếp
                </option>
                <option value={JSON.stringify({ sort: "price" })}>Giá Thấp-Cao</option>
                <option value={JSON.stringify({ sort: "-price" })}>Giá Cao-Thấp</option>
                <option value={JSON.stringify({ sort: "quantity" })}>Số lượng Thấp-Cao</option>
                <option value={JSON.stringify({ sort: "-quantity" })}>Số lượng Cao-Thấp</option>
                <option value={JSON.stringify({ sort: "createdAt" })}>Ngày thêm (Tăng dần)</option>
                <option value={JSON.stringify({ sort: "-createdAt" })}>Ngày thêm (Giảm dần)</option>
              </select>
            </div>
            {isShowProductDeletedTable ? (
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
      {/* <div className="flex justify-end mb-5 px-[20px]"></div> */}
      {isShowProductDeletedTable ? (
        <React.Fragment>
          <h1 className="text-black font-bold mb-5">Thùng rác</h1>
          <ProductDeletedTable
            products={products}
            handleDeleteProduct={handleDeleteProduct}
            handleRestoreProduct={handleRestoreProduct}
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
          <ProductTable
            products={products}
            handleSoftDelete={handleSoftDelete}
            handleShowEditProduct={handleShowEditProduct}
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
      )}
      {isShowAddProductModal && (
        <AddProductModal
          title="THÊM SẢN PHẨM"
          titleBtnFooter="THÊM SẢN PHẨM"
          handleAddProduct={handleAddProduct}
          closeModal={handleShowAddProductModal}
        />
      )}
      {isShowEditProductModal && (
        <EditProductModal
          title="Cập nhật sản phẩm"
          titleBtnFooter="CẬP NHẬT"
          closeModal={handleShowEditProduct}
          product={editProductData}
          handleUpdateProduct={handleUpdateProduct}
        />
      )}
    </PageLayout>
  );
}
