import { IconBack, IconRestore, IconAdd, IconDelete, IconBin } from "../../components/icon";
import PageLayout from "../../components/layout/pageLayout";
import SupplierTable from "../../components/supplier/supplierTable";
import supplierAPI from "../../api/supplierAPI";
import React, { useEffect, useState } from "react";
import AddSuplier from "../../components/supplier/AddSupplier";
import EditSupplier from "../../components/supplier/EditSupplier";
import Swal from "sweetalert2";
import useDebounce from "../../hooks/useDebounce";
import SupplierDeletedTable from "../../components/supplier/SupplierDeletedTable";

export default function Product() {
  const [isShowAddSupplier, setIsShowAddSupplier] = useState(false);
  const [isShowEditSupplier, setIsShowEditSupplier] = useState(false);
  const [editSupplierData, setEditSupplierData] = useState();
  const [supplier, setSupplier] = useState([]);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [isSelected, setIsSelected] = useState([]);
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const debounceValue = useDebounce(searchKeyWord, 500);
  const [isShowSupplierDeletedTable, setIsShowSupplierDeletedTable] = useState(false);
  //
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [limitPerPage, setLimitPerPage] = useState(10);

  useEffect(() => {
    getAllSupplier();
  }, [debounceValue, isShowSupplierDeletedTable, currentPage, limitPerPage]);

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

  const handleShowDeletedTable = () => {
    setIsShowSupplierDeletedTable(!isShowSupplierDeletedTable);
  };

  const handleSoftDelete = async (id) => {
    try {
      await supplierAPI.updateSupplier(id, { isActive: false });
      getAllSupplier();
    } catch (err) {
      console.log(err);
    }
  };
  const handleSoftDeleteMany = async () => {
    try {
      await supplierAPI.updateManySupplier({ supplierIds: isSelected, isActive: false });
      await getAllSupplier();
    } catch (err) {
      console.log(err);
    }
  };

  const handleRestore = async (id) => {
    try {
      await supplierAPI.updateSupplier(id, { isActive: true });
      getAllSupplier();
    } catch (err) {
      console.log(err);
    }
  };

  const handleRestoreMany = async () => {
    try {
      await supplierAPI.updateManySupplier({ supplierIds: isSelected, isActive: true });
      getAllSupplier();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteSupplier = async (id) => {
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
    let params = { page: currentPage, limit: limitPerPage };
    if (debounceValue) {
      params.search = debounceValue.trim();
    }
    if (isShowSupplierDeletedTable) {
      params.isActive = false;
    } else {
      params.isActive = true;
    }
    try {
      const response = await supplierAPI.getAllSupplier(params);
      if (response.data.length === 0 && response.currentPage !== 1) {
        setCurrentPage(response.currentPage - 1);
      }
      setSupplier(response.data);
      setTotalPageCount(response.totalPages);
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

  return (
    <PageLayout title="Nhà cung cấp">
      <div className="bg-white rounded-lg ring-1 ring-gray-200 ring-opacity-4 overflow-hidden mb-5 shadow-xs">
        <div className="p-4">
          <div className="flex justify-end items-center py-3 gap-x-4">
            {isShowSupplierDeletedTable ? (
              <React.Fragment>
                <button
                  disabled={isSelected.length <= 0}
                  onClick={() => {
                    Swal.fire({
                      title: "Bạn chắc chắn muốn khôi phục?",
                      text: "Các nhà cung cấp sẽ được khôi phục",
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
                          text: "Các nhà cung cấp đã được khôi phục.",
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
                      text: "Các nhà cung cấp sẽ được xoá và sẽ không thể khôi phục",
                      icon: "question",
                      showCancelButton: true,
                      confirmButtonColor: "#0E9F6E",
                      cancelButtonColor: "#d33",
                      cancelButtonText: "Huỷ bỏ",
                      confirmButtonText: "Đồng ý!",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        handleDeleteManySupplier();
                        Swal.fire({
                          title: "Đã xoá",
                          text: "Các nhà cung cấp đã được xoá.",
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
                      text: "Các nhà cung cấp sẽ được chuyển vào thùng rác",
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
                          text: "Các nhà cung cấp đã được chuyển vào thùng rác.",
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
            {isShowSupplierDeletedTable ? (
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
      {isShowSupplierDeletedTable ? (
        <React.Fragment>
          <h1 className="text-black font-bold mb-5">Thùng rác</h1>
          <SupplierDeletedTable
            supplier={supplier}
            handleShowEditSupplierModal={handleShowEditSupplierModal}
            handleReStoreSupplier={handleRestore}
            handleDeleteSupplier={handleDeleteSupplier}
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
      ) : (
        <React.Fragment>
          <h1 className="text-black font-bold mb-5">Danh sách</h1>
          <SupplierTable
            supplier={supplier}
            handleShowEditSupplierModal={handleShowEditSupplierModal}
            handleUpdateSupplier={handleShowEditSupplierModal}
            handleSoftDelete={handleSoftDelete}
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
    </PageLayout>
  );
}
