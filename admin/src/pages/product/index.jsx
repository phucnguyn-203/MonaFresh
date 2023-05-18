import React, { useState, useEffect } from "react";
import useDebounce from "../../hooks/useDebounce";
import { IconAdd, IconDelete } from "../../components/icon";
import PageLayout from "../../components/layout/pageLayout";
import AddProductModal from "../../components/product/AddProductModal";
import EditProductModal from "../../components/product/EditProductModal";
import ProductTable from "../../components/product/ProductTable";
import productAPI from "../../api/productAPI";
import categoryAPI from "../../api/categoryAPI";
import Swal from "sweetalert2";

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

  useEffect(() => {
    getAllProduct();
  }, [debounceValue, filterByCategory, sortValue]);

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
      setIsSelected(isSelected.filter((categoryId) => categoryId !== id));
    }
  };

  const getAllProduct = async () => {
    let params = {};
    if (debounceValue) {
      params.search = debounceValue.trim();
    }
    if (filterByCategory) {
      params.category = filterByCategory;
    }
    if (sortValue) {
      params = { ...params, ...sortValue };
    }
    try {
      const response = await productAPI.getAllProduct(params);
      setProducts(response.data);
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
    const { images, thumbnail, category, description, name, price, quantity, percentageDiscount } = data;
    await productAPI.createProduct({
      images,
      thumbnail,
      category,
      name,
      description,
      price,
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

  const handleDeteletProduct = async (id) => {
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
  const handleShowAddProductModal = () => {
    setIsShowAddProductModal(!isShowAddProductModal);
  };
  const handleShowEditProduct = (item) => {
    setIsShowEditProdcutModal(!isShowEditProductModal);
    setEditProductData(item);
  };

  return (
    <PageLayout title="Sản phẩm">
      <div className="bg-white rounded-lg ring-1 ring-gray-200 ring-opacity-4 overflow-hidden mb-5 shadow-xs">
        <div className="p-4">
          <div className="flex justify-end items-center py-3 gap-x-4">
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
                    Swal.fire({ title: "Đã xoá", text: "Các sản phẩm đã xoá.", confirmButtonColor: "#0E9F6E" });
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
          </div>
        </div>
      </div>
      <ProductTable
        products={products}
        handleDeteletProduct={handleDeteletProduct}
        handleShowEditProduct={handleShowEditProduct}
        handleUpdateProduct={handleUpdateProduct}
        isSelectAll={isSelectAll}
        isSelected={isSelected}
        handleSelectAll={handleSelectAll}
        handleSelected={handleSelected}
      />
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
