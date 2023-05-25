import React, { useState, useEffect } from "react";
import { Drawer, ModalHeader, ModalFooter } from "../../modal";
import { useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { IconClose, IconSearch, IconTotalOrder } from "../../icon";
import yup from "../../../utils/yupGlobal";
import uploadFileApi from "../../../api/uploadFileApi";
import formatCurrency from "../../../utils/formatCurrency";
import ExportModalTable from "../ExportModalTable";
import Loading from "../../loading";
import SearchResult from "../../search/SearchResults";
import useDebounce from "../../../hooks/useDebounce";
import productAPI from "../../../api/productAPI";

export default function AddModalExport({ closeModal, title, titleBtnFooter }) {
  const [products, setProducts] = useState([]);
  const [searchProductsResult, setSearchProductsResult] = useState([]);
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isShowResults, setIsShowResult] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [limitPerPage, setLimitPerPage] = useState(10);
  const [newQuantity, setNewQuantity] = useState(1);
  const [data, setData] = useState([]);
  const debounceValue = useDebounce(searchKeyword, 500);

  const currentUser = useSelector((state) => state.auth.currentUser);

  let totalMoney = 0;

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();

  useEffect(() => {
    const getAllProduct = async () => {
      if (debounceValue) {
        setIsSearching(true);
        try {
          const response = await productAPI.getAllProduct({
            search: debounceValue.trim(),
          });
          if (response.data.length === 0 && response.currentPage !== 1) {
            setCurrentPage(response.currentPage - 1);
          }
          setSearchProductsResult(response.data);
          setTotalPageCount(response.totalPages);
          setIsShowResult(true);
        } catch (err) {
          console.log(err);
        }
        setIsSearching(false);
      } else {
        setSearchProductsResult([]);
        setIsShowResult(false);
      }
    };
    getAllProduct();
  }, [debounceValue]);

  const totalPayment = () => {
    products.map((product) => {
      totalMoney += product.quantity * product.product.price;
    });
    return totalMoney;
  };
  totalPayment();
  const handleUpdateNewQuantity = (rowId, quantity) => {
    const product = products.find((item) => item._id === rowId);
    product.quantity = +quantity;
    setProduct([...products, product]);
  };

  const handleDelete = (id) => {
    const newProducts = products.filter((product) => product._id !== id);
    setProducts(newProducts);
  };

  return (
    <div>
      <div onClick={closeModal} className={`bg-black/30 top-0 right-0 left-0 w-full h-full fixed `}></div>
      <Drawer closeModal={closeModal} title={title} titleBtnFooter={titleBtnFooter} isFullWidth={true}>
        <ModalHeader closeModal={closeModal} title={title} />
        <div className="h-full overflow-y-scroll grow p-[30px] flex gap-10 ">
          <div className="w-[65%] p-[15px] ">
            <div className="relative flex bg-white w-full items-center text-black px-5 py-2 border-[1px] border-solid border-gray-400 rounded-[5px] mb-[20px]">
              <IconSearch />
              <input
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                type="search"
                placeholder="Nhập tên hàng hoá"
                className="focus:outline-none placeholder:text-sm bg-white w-full p-[5px] ml-[10px]"
              />
            </div>
            {isShowResults && (
              <SearchResult
                searchProductsResult={searchProductsResult}
                isSearching={isSearching}
                products={products}
                setProducts={setProducts}
                newQuantity={newQuantity}
                setNewQuantity={setNewQuantity}
                closeSearchResult={() => setSearchKeyword("")}
              />
            )}
            <ExportModalTable
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPageCount={totalPageCount}
              limitPerPage={limitPerPage}
              setLimitPerPage={setLimitPerPage}
              products={products}
              setNewQuantity={handleUpdateNewQuantity}
              handleDelete={handleDelete}
            />
          </div>
          <div className="w-[35%] p-[15px] border-[1px] shadow-xl">
            <div className="w-full min-h-[100px] p-[10px]">
              <h2 className="mb-[15px] font-semibold text-lg">Thông tin phiếu xuất hàng</h2>
              <div className="flex items-center p-[10px]">
                <label className="w-[30%] " htmlFor="">
                  Người phụ trách
                </label>
                <p className="font-semibold">{currentUser?.name}</p>
              </div>
              <div className="flex items-center p-[10px]">
                <label className="w-[30%] " htmlFor="">
                  Thời gian
                </label>
                <p>{`${day}/${month}/${year}`}</p>
              </div>
              {/* <textarea
                name=""
                id=""
                placeholder="Ghi chú"
                className="w-full p-[8px] my-[10px] border-[1px] border-solid border-gray-400 bg-gray-50 focus:bg-transparent focus:border-gray-600 focus:outline-none"
              ></textarea> */}
            </div>
            <div className="ml-[15px]">
              <h2 className="font-medium">Thông tin thanh toán</h2>
              <div className="flex justify-between p-[10px]">
                <h4>Tạm tính</h4>
                <h4>{formatCurrency(totalMoney)}</h4>
              </div>
              <div className="flex justify-between p-[10px]">
                <h4>Tiền vận chuyển</h4>
                <h4>{formatCurrency(0)}</h4>
              </div>
              <div className="flex justify-between p-[10px]">
                <h4>Thanh toán</h4>
                <h4 className="text-red-500 font-medium">{formatCurrency(totalMoney)}</h4>
              </div>
            </div>
          </div>
          <input type="submit" hidden id="send" onClick={() => console.log(products)} />
        </div>
        <ModalFooter title={titleBtnFooter} isLoading={isLoading} />
      </Drawer>
    </div>
  );
}
