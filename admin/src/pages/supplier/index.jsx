import { IconAdd, IconDelete } from "../../components/icon";
import PageLayout from "../../components/layout/pageLayout";
import SupplierTable from "../../components/supplier/supplierTable";
import supplierAPI from "../../api/supplierAPI";
import { useEffect, useState } from "react";
import AddSuplier from "../../components/supplier/AddSupplier";
import EditSupplier from "../../components/supplier/EditSupplier";
import Swal from "sweetalert2";
import useDebounce from "../../hooks/useDebounce";

export default function Product() {
  const [isShowAddSupplier, setIsShowAddSupplier] = useState(false);
  const [isShowEditSupplier, setIsShowEditSupplier] = useState(false);
  const [editSupplierData, setEditSupplierData] = useState();
  const [supplier, setSupplier] = useState([]);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [isSelected, setIsSelected] = useState([]);
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const debounceValue = useDebounce(searchKeyWord, 500);

  const handleSelectAll = () => {
    setIsSelectAll(!isSelectAll);
    setIsSelected(supplier.map((supplier) => supplier._id));
    if (isSelectAll) {
      setIsSelected([]);
    }
  };

  const handleSelected = (event) => {
    const { id, checked } = event.target;
    setIsSelected([...isSelected, id]);
    if (!checked) {
      setIsSelected(isSelected.filter((supplierId) => supplierId !== id));
    }
  };

  const handleShowAddSupplierModal = () => {
    setIsShowAddSupplier(!isShowAddSupplier);
  };
  const handleShowEditSupplierModal = (item) => {
    setIsShowEditSupplier(!isShowEditSupplier);
    setEditSupplierData(item);
  };

  const handleDeteletSupplier = async (id) => {
    try {
      await supplierAPI.deleteSupplier(id);
      setIsSelected([]);
      getAllSupplier();
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateSupplier = async (id, data) => {
    try {
      await supplierAPI.updateSupplier(id, data);
      setIsShowEditSupplier(false);
      getAllSupplier();
    } catch (err) {
      console.log(err);
    }
  };

  const getAllSupplier = async () => {
    let params = {};
    if (debounceValue) {
      params.search = debounceValue.trim();
    }
    try {
      const response = await supplierAPI.getAllSupplier(params);
      setSupplier(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddSupplier = async (data) => {
    const { name, email, address, phone } = data;
    try {
      await supplierAPI.addSupplier({ name, email, address, phone });
      setIsShowAddSupplier(false);
      getAllSupplier();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteManySupplier = async () => {
    try {
      await supplierAPI.deleteManySupplier(isSelected);
      setIsSelected([]);
      setIsSelectAll();
      getAllSupplier();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllSupplier();
  }, [debounceValue]);

  return (
    <PageLayout title="Nhà cung cấp">
      <div className="bg-white rounded-lg ring-1 ring-gray-200 ring-opacity-4 overflow-hidden mb-5 shadow-xs">
        <div className="p-4">
          <div className="flex justify-end items-center py-3 gap-x-4">
            <button
              disabled={isSelected.length <= 0}
              onClick={() => {
                Swal.fire({
                  title: "Bạn chắc chắn muốn xoá?",
                  text: "Các sản phẩm thuộc các danh mục này cũng sẽ bị xoá và sẽ không thể khôi phục",
                  icon: "question",
                  showCancelButton: true,
                  confirmButtonColor: "#0E9F6E",
                  cancelButtonColor: "#d33",
                  cancelButtonText: "Huỷ bỏ",
                  confirmButtonText: "Đồng ý!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    handleDeleteManySupplier();
                    Swal.fire({ title: "Đã xoá", text: "Các danh mục đã xoá.", confirmButtonColor: "#0E9F6E" });
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
              onClick={handleShowAddSupplierModal}
            >
              <span className="mr-3">
                <IconAdd />
              </span>
              Thêm nhà cung cấp
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg ring-1 ring-gray-200 ring-opacity-4 overflow-hidden mb-5 shadow-xs">
        <div className="p-4">
          <div className="py-3 flex gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex">
            <div className=" md:flex-grow lg:flex-grow xl:flex-grow ">
              <input
                value={searchKeyWord}
                onChange={(e) => setSearchKeyWord(e.target.value)}
                className="block w-full px-3 py-1 text-sm focus:outline-none leading-5 rounded-md focus:border-gray-200 border-gray-200 border h-12 bg-gray-100 border-transparent focus:bg-white"
                type="search"
                placeholder="Nhập tên nhà cung cấp"
              />
            </div>
          </div>
        </div>
      </div>
      {isShowAddSupplier && (
        <AddSuplier
          title="THÊM NHÀ CUNG CẤP"
          titleBtnFooter="THÊM NHÀ CUNG CẤP"
          handleAddSupplier={handleAddSupplier}
          closeModal={handleShowAddSupplierModal}
        />
      )}
      {isShowEditSupplier && (
        <EditSupplier
          title="Cập nhật thông tin nhà cung cấp"
          titleBtnFooter="CẬP NHẬT"
          closeModal={handleShowEditSupplierModal}
          supplier={editSupplierData}
          handleUpdateSupplier={handleUpdateSupplier}
        />
      )}
      <SupplierTable
        supplier={supplier}
        handleShowEditSupplierModal={handleShowEditSupplierModal}
        handleUpdateSupplier={handleShowEditSupplierModal}
        handleDeteletSupplier={handleDeteletSupplier}
        isSelectAll={isSelectAll}
        isSelected={isSelected}
        handleSelectAll={handleSelectAll}
        handleSelected={handleSelected}
      />
    </PageLayout>
  );
}
