import React, { useState } from "react";
import { IconAdd, IconDelete } from "../../components/icon";
import PageLayout from "../../components/layout/pageLayout";
import AddModalProduct from "../../components/product/AddModalProduct";
import ProductTable from "../../components/product/ProductTable";
import productAPI from "../../api/productAPI";
import { useEffect } from "react";
import EditModalProduct from "../../components/product/EditModalProduct/index";
import categoryAPI from "../../api/categoryAPI";

export default function Product() {
  const [isShowAddProductModal, setIsShowAddProductModal] = useState(false);
  const [isShowEditProductModal, setIsShowEditProdcutModal] = useState(false);
  const [editProductData, setEditProductData] = useState();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const getAllProduct = async () => {
    try {
      const response = await productAPI.getAllProduct();
      setProducts(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddProduct = async (data) => {
    const { images, thumbnail, category, description, name, price, quantity, percentageDiscount } = data;
    try {
      await productAPI.addProduct({
        images,
        thumbnail,
        category,
        name,
        description,
        price,
        quantity,
        percentageDiscount: percentageDiscount / 100,
      });
      setIsShowAddProductModal(false);
      getAllProduct();
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateProduct = async (id, data) => {
    try {
      await productAPI.updateProduct(id, data);
      setIsShowEditProdcutModal(false);
      getAllProduct();
    } catch (err) {
      console.log(err);
    }
  };
  const handleDeteletProduct = async (id) => {
    try {
      await productAPI.deleteProduct(id);
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

  const showAllCategory = async () => {
    try {
      const response = await categoryAPI.getAllCategory();
      setCategories(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    showAllCategory();
    getAllProduct();
  }, []);

  console.log(products);
  return (
    <PageLayout title="Sản phẩm">
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
                type="sreach"
                name="sreach"
                placeholder="Tìm theo tên sản phẩm"
              />
            </div>
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow ">
              <select
                className="block w-full h-12 px-2 py-1 text-sm focus:outline-none leading-5 
                        rounded-md focus:border-gray-200 border-gray-200 bg-gray-100 ring-1 ring-gray-200
                        focus:bg-white border-transparent form-select "
              >
                <option value="All" hidden="">
                  Danh Mục
                </option>
                {categories.map((item) => (
                  <option value={item._id} key={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow ">
              <select
                className="block w-full h-12 px-2 py-1 text-sm focus:outline-none leading-5 
                        rounded-md focus:border-gray-200 border-gray-200 bg-gray-100 ring-1 ring-gray-200
                        focus:bg-white border-transparent form-select "
              >
                <option value="All" hidden="">
                  Giá
                </option>
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
      />
      {isShowAddProductModal && (
        <AddModalProduct
          title="THÊM SẢN PHẨM"
          titleBtnFooter="THÊM SẢN PHẨM"
          handleAddProduct={handleAddProduct}
          closeModal={handleShowAddProductModal}
        />
      )}
      {isShowEditProductModal && (
        <EditModalProduct
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
