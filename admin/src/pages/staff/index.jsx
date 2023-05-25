import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

import { IconBin, IconAdd, IconDelete, IconBack, IconRestore } from "../../components/icon";
import PageLayout from "../../components/layout/pageLayout";
import StaffTable from "../../components/staff/StaffTable";
import StaffDeletedTable from "../../components/staff/StaffDeletedTable";
import AddModalStaff from "../../components/staff/AddModalStaff";
import EditModalStaff from "../../components/staff/EditModalStaff";
import staffAPI from "../../api/staffAPI";
import { USER_ROLES } from "../../utils/Constant";
import useDebounce from "../../hooks/useDebounce";
import { useSelector } from "react-redux";

export default function Staff() {
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  const [showEditStaffModal, setShowEditStaffModal] = useState(false);
  const [editStaffData, setEditStaffData] = useState();
  const [staffs, setStaffs] = useState([]);
  const [filterByRole, setFilterByRole] = useState();
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const debounceValue = useDebounce(searchKeyWord, 500);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [isSelected, setIsSelected] = useState([]);
  const [isShowStaffDeletedTable, setIsShowStaffDeletedTable] = useState(false);
  //
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [limitPerPage, setLimitPerPage] = useState(10);

  const currentUser = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    getAllStaff();
  }, [debounceValue, filterByRole, isShowStaffDeletedTable, currentPage, limitPerPage, showAddStaffModal, showEditStaffModal]);

  const handleShowAddModal = () => {
    setShowAddStaffModal(!showAddStaffModal);
  };
  const handleShowEditStaffModal = (item) => {
    setShowEditStaffModal(!showEditStaffModal);
    setEditStaffData(item);
  };

  const getAllStaff = async () => {
    let params = { page: currentPage, limit: limitPerPage, role: [USER_ROLES.ADMIN, USER_ROLES.STAFF] };
    if (debounceValue) {
      params.search = debounceValue.trim();
    }
    if (filterByRole) {
      params.role = filterByRole;
    }
    if (isShowStaffDeletedTable) {
      params.isActive = false;
    } else {
      params.isActive = true;
    }
    try {
      const response = await staffAPI.getAllStaff(params);
      if (response.data.length === 0 && response.currentPage !== 1) {
        setCurrentPage(response.currentPage - 1);
      }
      setStaffs(response.data);
      setTotalPageCount(response.totalPages);
    } catch (err) {
      console.log(err);
    }
  };
  const handleAddStaff = async (data) => {
    const { photo, name, email, phone, password, passwordConfirm, role } = data;
    try {
      await staffAPI.addStaff({
        photo,
        name,
        email,
        phone,
        password,
        passwordConfirm,
        role,
      });
      setShowAddStaffModal(false);
      await getAllStaff();
    } catch (err) {
      console.log(err);
    }
  };
  const handleUpdateStaff = async (id, data) => {
    try {
      await staffAPI.updateStaff(id, { ...data });
      setShowEditStaffModal(false);
      await getAllStaff();
    } catch (error) {
      console.log(error);
    }
  };
  const handleSelectAll = () => {
    setIsSelectAll(!isSelectAll);
    setIsSelected(staffs.map((staff) => staff._id));
    if (isSelectAll) {
      setIsSelected([]);
    }
  };
  const handleSelected = (event) => {
    const { id, checked } = event.target;
    setIsSelected([...isSelected, id]);
    if (!checked) {
      setIsSelected(isSelected.filter((staffId) => staffId !== id));
    }
  };
  const handleUpdateStaffStatus = async (id, data) => {
    await staffAPI.updateStaffStatus(id, data);
    await getAllStaff();
  };
  const handleDeleteStaff = async (id) => {
    try {
      await staffAPI.deleteStaff(id);
      getAllStaff();
    } catch (err) {
      console.log(err);
    }
  };
  const handleDeleteManyStaff = async () => {
    try {
      await staffAPI.deleteManyStaff({ staffIds: isSelected });
      console.log(isSelected);
      getAllStaff();
    } catch (err) {
      console.log(err);
    }
  };
  const handleSoftDeleteStaff = async (id) => {
    try {
      await staffAPI.updateStaffStatus(id, { isActive: false });
      getAllStaff();
    } catch (err) {
      console.log(err);
    }
  };
  const handleSoftDeleteManyStaff = async () => {
    try {
      await staffAPI.updateManyStaffStatus({ staffIds: isSelected, isActive: false });
      getAllStaff();
    } catch (err) {
      console.log(err);
    }
  };
  const handleRestoreStaff = async (id) => {
    try {
      await staffAPI.updateStaffStatus(id, { isActive: true });
      getAllStaff();
    } catch (err) {
      console.log(err);
    }
  };
  const handleRestoreManyStaff = async () => {
    try {
      await staffAPI.updateManyStaffStatus({ staffIds: isSelected, isActive: true });
      getAllStaff();
    } catch (err) {
      console.log(err);
    }
  };
  const handleShowDeletedTable = () => {
    setIsShowStaffDeletedTable(!isShowStaffDeletedTable);
  };
  return (
    <PageLayout title="Nhân viên">
      <div className="bg-white rounded-lg ring-1 ring-gray-200 ring-opacity-4 overflow-hidden mb-5 shadow-xs">
        <div className="p-4">
          <div className="flex justify-end items-center py-3 gap-x-4">
            {isShowStaffDeletedTable ? (
              <React.Fragment>
                <button
                  disabled={isSelected.length <= 0}
                  onClick={() => {
                    Swal.fire({
                      title: "Bạn chắc chắn muốn khôi phục?",
                      text: "Các nhân viên sẽ được khôi phục.",
                      icon: "question",
                      showCancelButton: true,
                      confirmButtonColor: "#0E9F6E",
                      cancelButtonColor: "#d33",
                      cancelButtonText: "Huỷ bỏ",
                      confirmButtonText: "Đồng ý!",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        handleRestoreManyStaff();
                        Swal.fire({
                          title: "Đã Khôi phục",
                          text: "Các nhân viên đã được khôi phục.",
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
                      text: "Các nhân viên sẽ được xoá và không thể khôi phục.",
                      icon: "question",
                      showCancelButton: true,
                      confirmButtonColor: "#0E9F6E",
                      cancelButtonColor: "#d33",
                      cancelButtonText: "Huỷ bỏ",
                      confirmButtonText: "Đồng ý!",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        handleDeleteManyStaff();
                        Swal.fire({
                          title: "Đã xoá",
                          text: "Các nhân viên đã được xoá.",
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
                      text: "Các nhân viên sẽ được chuyển vào thùng rác.",
                      icon: "question",
                      showCancelButton: true,
                      confirmButtonColor: "#0E9F6E",
                      cancelButtonColor: "#d33",
                      cancelButtonText: "Huỷ bỏ",
                      confirmButtonText: "Đồng ý!",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        handleSoftDeleteManyStaff();
                        Swal.fire({
                          title: "Đã chuyển vào thùng rác",
                          text: "Các nhân viên đã được chuyển vào thùng rác.",
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
              onClick={handleShowAddModal}
            >
              <span className="mr-3">
                <IconAdd />
              </span>
              Thêm Nhân Viên
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg ring-1 ring-gray-200 ring-opacity-4 overflow-hidden mb-5 shadow-xs">
        <div className="p-4">
          <div className="py-3 flex gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex">
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <input
                value={searchKeyWord}
                className="block w-full h-12 px-3 py-1 text-sm focus:outline-none leading-5 
                        rounded-md focus:border-gray-200 border-gray-200 bg-gray-100 ring-1 ring-gray-200
                        focus:bg-white border-transparent"
                type="text"
                name="searchKeyWord"
                placeholder="Tìm theo tên nhân viên"
                onChange={(e) => setSearchKeyWord(e.target.value)}
              />
            </div>
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <select
                className="block w-full px-3 py-1 text-sm h-12 rounded-md bg-gray-100 focus:bg-gray-50 border-[1px] focus:bg-transparent focus:outline-none"
                onChange={(e) => {
                  setFilterByRole(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value={""}>Tất cả</option>
                <option value={USER_ROLES.STAFF}>Nhân viên</option>
                <option value={USER_ROLES.ADMIN}>Quản lý</option>
              </select>
            </div>
            {isShowStaffDeletedTable ? (
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
      <div className="flex justify-end mb-5 px-[20px]"></div>
      {isShowStaffDeletedTable ? (
        <React.Fragment>
          <h1 className="text-black font-bold mb-5">Thùng rác</h1>
          <StaffDeletedTable
            staffs={staffs}
            handleDelete={handleDeleteStaff}
            handleRestore={handleRestoreStaff}
            handleSelected={handleSelected}
            isSelected={isSelected}
            handleSelectAll={handleSelectAll}
            isSelectAll={isSelectAll}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPageCount={totalPageCount}
            limitPerPage={limitPerPage}
            setLimitPerPage={setLimitPerPage}
            currentUser={currentUser}
          />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <h1 className="text-black font-bold mb-5">Danh sách</h1>
          <StaffTable
            staffs={staffs}
            handleSoftDelete={handleSoftDeleteStaff}
            handleShowEditStaffModal={handleShowEditStaffModal}
            isSelectAll={isSelectAll}
            isSelected={isSelected}
            handleSelectAll={handleSelectAll}
            handleSelected={handleSelected}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPageCount={totalPageCount}
            limitPerPage={limitPerPage}
            setLimitPerPage={setLimitPerPage}
            currentUser={currentUser}
          />
        </React.Fragment>
      )}
      {showAddStaffModal && (
        <AddModalStaff
          closeModal={handleShowAddModal}
          title="THÊM NHÂN VIÊN"
          titleBtnFooter="THÊM"
          handleAddStaff={handleAddStaff}
          getAllStaff={getAllStaff}
        />
      )}
      {showEditStaffModal && (
        <EditModalStaff
          closeModal={handleShowEditStaffModal}
          title="CẬP NHẬT NHÂN VIÊN"
          titleBtnFooter="CẬP NHẬT"
          staff={editStaffData}
          handleUpdateStaff={handleUpdateStaff}
          getAllStaff={getAllStaff}
        />
      )}
    </PageLayout>
  );
}
