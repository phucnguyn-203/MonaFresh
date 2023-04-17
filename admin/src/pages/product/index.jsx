import { useState } from "react";

import IconPlus from "../../components/icon/plus";
import IconArrowdown from "../../components/icon/plus";
import PageLayout from "../../components/layout/pageLayout";
import AddModalProduct from "../../components/product/AddModalProduct";

export default function Product() {
    const [showAddModal, setShowAddModal] = useState(false);
    // const [showEditModal, setShowEditModal] = useState(false);
    const handleShowProductModal = () => {
        setShowAddModal(!showAddModal);
    };
    // const handleShowEditProductModal = () => {
    //     setShowEditModal(!showEditModal);
    // };
    return (
        <PageLayout title="Sản phẩm">
            <div className="min-w-0 bg-white rounded-lg ring-1 ring-gray-200 ring-opacity-4 overflow-hidden mb-5 shadow-xs">
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
                                    Tất cả
                                </option>
                                <option value="Organic Food">Thực phẩm Organic</option>
                                <option value="Fish &amp; Meat">Cá &amp; Thịt</option>
                                <option value="Fruits &amp; Vegetable">Trái cây &amp; Rau củ</option>
                                <option value="Fresh Seafood">Hải sản tươi sống</option>
                                <option value="Cooking Essentials">Dụng Cụ Nấu Ăn</option>
                                <option value="Breakfast">Bữa sáng</option>
                                <option value="Drinks">Đồ uống</option>
                                <option value="Milk &amp; Dairy">Sữa &amp; Bơ</option>
                                <option value="Honey">Mật ong</option>
                                <option value="Jam &amp; Jelly">Mứt &amp; Thạch</option>
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
                                <option value="Low">Thấp đến cao</option>
                                <option value="High">Cao đến thấp </option>
                            </select>
                        </div>
                        <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                            <button
                                onClick={handleShowProductModal}
                                className="w-full h-12 align-bottom inline-flex leading-5 items-center justify-center 
                        cursor-pointer transition-colors duration-150 font-medium px-4 py-2 rounded-lg text-sm 
                        text-white bg-primary border border-transparent hover:bg-emerald-700 "
                            >
                                <span className="mr-3">
                                    <IconPlus />
                                </span>
                                Thêm sản phẩm
                            </button>
                        </div>
                    </div>
                </div>
                {showAddModal && (
                    <AddModalProduct
                        closeModal={handleShowProductModal}
                        title={"THÊM SẢN PHẨM"}
                        titleBtnFooter={"THÊM"}
                    />
                )}
            </div>
        </PageLayout>
    );
}
