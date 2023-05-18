import { useEffect, useState } from "react";

import { IconAdd } from "../../components/icon";
import { IconDelete } from "../../components/icon";
import PageLayout from "../../components/layout/pageLayout";
import StaffTable from "../../components/staff/StaffTable";
import AddModalStaff from "../../components/staff/AddModalStaff";
import EditModalStaff from "../../components/staff/EditModalStaff";
import staffAPI from "../../api/staffAPI";
import { USER_ROLES } from "../../utils/Constant";
import useDebounce from "../../hooks/useDebounce";

export default function Staff() {
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  const [showEditStaffModal, setShowEditStaffModal] = useState(false);
  const [editStaffData, setEditStaffData] = useState();
  const [staffs, setStaffs] = useState([]);
  const [filterByRole, setFilterByRole] = useState();
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const debounceValue = useDebounce(searchKeyWord, 500);

  useEffect(() => {
    getAllStaff();
  }, [debounceValue, filterByRole]);

  const handleCloseAddModal = () => {
    setShowAddStaffModal(!showAddStaffModal);
  };
  const handleShowEditStaff = (item) => {
    setShowEditStaffModal(!showEditStaffModal);
    setEditStaffData(item);
  };

  const getAllStaff = async () => {
    let params = {
      // role: [USER_ROLES.ADMIN, USER_ROLES.STAFF],
    };
    if (debounceValue) {
      params.search = debounceValue.trim();
    }
    if (filterByRole) {
      params.role = filterByRole;
    }
    try {
      const response = await staffAPI.getAllStaff(params);
      setStaffs(response.data);
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

  return (
    <PageLayout title="Nhân viên">
      <div className="bg-white rounded-lg ring-1 ring-gray-200 ring-opacity-4 overflow-hidden mb-5 shadow-xs">
        <div className="p-4">
          <div className="flex justify-end items-center py-3 gap-x-4">
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
            <select
              className="block w-full px-3 py-1 text-sm h-12 rounded-md bg-gray-100 focus:bg-gray-50 border-[1px] focus:bg-transparent focus:outline-none"
              onChange={(e) => setFilterByRole(e.target.value)}
            >
              <option value={USER_ROLES.STAFF}>Nhân viên</option>
              <option value={USER_ROLES.ADMIN}>Quản lý</option>
            </select>
            <button
              className="h-12 align-bottom inline-flex leading-5 items-center justify-center 
                        transition-colors duration-150 font-medium px-10 py-2 rounded-lg text-sm 
                        text-white bg-red-300 cursor-not-allowed border border-transparent"
            >
              <span className="mr-2">
                <IconDelete />
              </span>
              Xoá
            </button>
            <button
              onClick={handleCloseAddModal}
              className="h-12 w-[500px] align-bottom inline-flex leading-5 items-center justify-center 
                        cursor-pointer transition-colors duration-150 font-medium px-4 py-2 rounded-lg text-sm 
                        text-white bg-primary border border-transparent hover:bg-emerald-700 "
            >
              <span className="mr-3">
                <IconAdd />
              </span>
              Thêm nhân viên
            </button>
          </div>
        </div>
      </div>
      {showAddStaffModal && (
        <AddModalStaff
          closeModal={handleCloseAddModal}
          title="THÊM NHÂN VIÊN"
          titleBtnFooter="THÊM"
          handleAddStaff={handleAddStaff}
        />
      )}
      {showEditStaffModal && (
        <EditModalStaff
          closeModal={handleShowEditStaff}
          title="CẬP NHẬT NHÂN VIÊN"
          titleBtnFooter="CẬP NHẬT"
          staff={editStaffData}
          handleUpdateStaff={handleUpdateStaff}
        />
      )}
      <StaffTable staffs={staffs} handleShowEditStaff={handleShowEditStaff} />
    </PageLayout>
  );
}
