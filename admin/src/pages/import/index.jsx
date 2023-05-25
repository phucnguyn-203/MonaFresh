import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import PageLayout from "../../components/layout/pageLayout";
import { IconAdd } from "../../components/icon";
import AddModalImport from "../../components/import/addModalImport";
import invoiceAPI from "../../api/invoiceAPI";
import staffAPI from "../../api/staffAPI";
import ImportTable from "../../components/import/ImportTable";
import { USER_ROLES } from "../../utils/Constant";
import useDebounce from "../../hooks/useDebounce";
import Bill from "../../components/import/Bill";
import Filter from "../../components/import/Fillter";

export default function Import() {
  const [showModalImport, setShowModalImport] = useState(false);
  const [showBill, setShowBill] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [billData, setBillData] = useState();
  const [staffs, setStaffs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [limitPerPage, setLimitPerPage] = useState(10);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const [sortValue, setSortValue] = useState("");
  const debounceValue = useDebounce(searchKeyWord, 500);

  useEffect(() => {
    getAllInvoice();
  }, [currentPage, limitPerPage, sortValue]);

  console.log(sortValue);

  useEffect(() => {
    getAllStaff();
  }, []);
  const getAllInvoice = async () => {
    let params = { page: currentPage, limit: limitPerPage };
    if (sortValue) {
      params = { ...params, ...sortValue };
    }
    try {
      const response = await invoiceAPI.getAllInvoice(params);
      if (response.data.length === 0 && response.currentPage !== 1) {
        setCurrentPage(response.currentPage - 1);
      }
      setInvoices(response.data);
      setTotalPageCount(response.totalPages);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllStaff = async () => {
    let params = { page: currentPage, limit: limitPerPage, role: [USER_ROLES.ADMIN, USER_ROLES.STAFF] };

    try {
      const response = await staffAPI.getAllStaff(params);
      setStaffs(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleShowModalImport = () => {
    setShowModalImport(!showModalImport);
  };

  const handleShowBill = (item) => {
    setShowBill(!showBill);
    setBillData(item);
  };

  const handleAddImportInvoice = async (data) => {
    const { products, createdBy } = data;
    try {
      if (products.length >= 1) {
        await invoiceAPI.createImportInvoice({ products, createdBy });
      }
      await getAllInvoice();
    } catch (error) {
      console.log(error);
    }
    setShowModalImport(false);
  };

  const handleShowStaffName = (staffID) => {
    if (currentUser._id === staffID) {
      return currentUser.name;
    }
    staffs.map((staff) => {
      if (staff._id === staffID) {
        return staff.name;
      }
    });
  };

  return (
    <PageLayout title="Quản lý nhập hàng">
      {/* <div className="bg-white rounded-lg ring-1 ring-gray-200 ring-opacity-4 overflow-hidden mb-5 shadow-xs">
        <div className="p-4">
          <div className="flex justify-end items-center py-3 gap-x-4">
            <React.Fragment>
              <button
                className="h-12 align-bottom inline-flex leading-5 items-center justify-center 
              cursor-pointer transition-colors duration-150 font-medium px-4 py-2 rounded-lg text-sm 
              text-white bg-primary border border-transparent hover:bg-emerald-700 "
                onClick={handleShowModalImport}
              >
                <span className="mr-3">
                  <IconAdd />
                </span>
                Thêm đơn hàng
              </button>
            </React.Fragment>
          </div>
        </div>
      </div> */}
      <Filter
        invoices={invoices}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPageCount={totalPageCount}
        limitPerPage={limitPerPage}
        setLimitPerPage={setLimitPerPage}
        sortValue={sortValue}
        setSortValue={setSortValue}
        handleShowModalImport={handleShowModalImport}
      />
      {showModalImport && (
        <AddModalImport
          closeModal={handleShowModalImport}
          title="PHIẾU NHẬP HÀNG"
          titleBtnFooter="LƯU"
          handleAddImportInvoice={handleAddImportInvoice}
        />
      )}
      {showBill && <Bill close={handleShowBill} invoice={billData} />}
      <ImportTable
        invoices={invoices}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPageCount={totalPageCount}
        limitPerPage={limitPerPage}
        setLimitPerPage={setLimitPerPage}
        handleShowStaffName={handleShowStaffName}
        handleShowBill={handleShowBill}
      />
    </PageLayout>
  );
}
