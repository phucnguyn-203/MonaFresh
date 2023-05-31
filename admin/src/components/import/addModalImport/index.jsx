import React, { useState, useEffect } from "react";
import { Drawer, ModalHeader } from "../../modal";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { IconSearch } from "../../icon";
import formatCurrency from "../../../utils/formatCurrency";
import ImportModalTable from "../ImportModalTable";
import SearchResult from "../../search/SearchResults";
import useDebounce from "../../../hooks/useDebounce";
import productAPI from "../../../api/productAPI";

export default function AddModalImport({ closeModal, title, titleBtnFooter, handleAddImportInvoice }) {
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
  const debounceValue = useDebounce(searchKeyword, 500);

  const currentUser = useSelector((state) => state.auth.currentUser);
  let totalMoney = 0;

  const { handleSubmit } = useForm();
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
          setSearchProductsResult(response.data);
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
    // hàm tính tổng số tiền cần thanh toán
    products.map((product) => {
      totalMoney += product.quantity * product.product.importPrice;
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

  const onSubmit = () => {
    try {
      const newData = products.map((item) => {
        const newItem = {
          productId: item._id,
          quantity: item.quantity,
          name: item.product.name,
          importPrice: item.product.importPrice,
        };
        return newItem;
      });
      const createdBy = currentUser._id;
      handleAddImportInvoice({ products: newData, createdBy: createdBy });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div onClick={closeModal} className={`bg-black/30 top-0 right-0 left-0 w-full h-full fixed `}></div>
      <Drawer closeModal={closeModal} title={title} titleBtnFooter={titleBtnFooter} isFullWidth={true}>
        <ModalHeader closeModal={closeModal} title={title} />
        <div className="h-full overflow-y-scroll grow p-[30px] flex gap-10 ">
          <form onSubmit={handleSubmit(onSubmit)} className="w-[65%]">
            <div className="relative flex bg-white w-[100%] items-center text-black px-5 py-2 border-[1px] border-solid border-gray-400 rounded-[5px] mb-[20px]">
              <IconSearch />
              <input
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                type="search"
                placeholder="Nhập tên hàng hoá"
                className="focus:outline-none placeholder:text-sm bg-white w-full p-[5px] ml-[10px]"
              />
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
            </div>

            <ImportModalTable
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPageCount={totalPageCount}
              limitPerPage={limitPerPage}
              setLimitPerPage={setLimitPerPage}
              products={products}
              setNewQuantity={handleUpdateNewQuantity}
              handleDelete={handleDelete}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
            />
            {products.length >= 1 ? (
              <button
                className="bg-primary text-white h-[48px] w-[250px] text-lg font-semibold rounded-md text-center flex justify-center items-center"
                type="submit"
              >
                GỬI
              </button>
            ) : (
              ""
            )}

            <input type="submit" hidden id="send" disabled={isLoading} />
          </form>

          <div className="w-[35%] min-h-[300px] p-[15px] border-[1px] shadow-xl ">
            <div className="p-[10px]">
              <h2 className="mb-[15px] font-semibold text-lg">Thông tin phiếu nhập hàng</h2>
              <div className="flex items-center py-[10px]">
                <p className="w-[30%] " htmlFor="">
                  Người nhập:
                </p>
                <p className="font-semibold">{currentUser?.name}</p>
              </div>
              <div className="flex items-center py-[10px]">
                <p className="w-[30%]" htmlFor="">
                  Thời gian:
                </p>
                <p>{`${day}/${month}/${year}`}</p>
              </div>
            </div>
            <div className="p-[10px]">
              <h2 className="font-medium">Thông tin thanh toán</h2>
              <div className="flex justify-between py-[10px] ">
                <h4>Tạm tính</h4>
                <h4>{formatCurrency(totalMoney)}</h4>
              </div>
              <div className="flex justify-between py-[10px]">
                <h4>Tiền vận chuyển</h4>
                <h4>{formatCurrency(0)}</h4>
              </div>
              <div className="flex justify-between py-[10px]">
                <h4>Thanh toán</h4>
                <h4 className="text-red-500 font-medium">{formatCurrency(totalMoney)}</h4>
              </div>
            </div>
          </div>
          <input type="submit" hidden id="send" disabled={isLoading} />
        </div>
      </Drawer>
    </>
  );
}
