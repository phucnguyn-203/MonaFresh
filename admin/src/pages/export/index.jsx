import React, { useEffect, useState } from "react";

import PageLayout from "../../components/layout/pageLayout";
import AddModalExport from "../../components/export/addModalExport";
import invoiceAPI from "../../api/invoiceAPI";
import ExportTable from "../../components/export/ExportTable";
import useDebounce from "../../hooks/useDebounce";
import Bill from "../../components/export/Bill";
import Filter from "../../components/export/Fillter";

export default function Export() {
  const [showModalExport, setShowModalExport] = useState(false);
  const [showBill, setShowBill] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [billData, setBillData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [limitPerPage, setLimitPerPage] = useState(10);
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const [sortValue, setSortValue] = useState("");
  const debounceValue = useDebounce(searchKeyWord, 500);

  useEffect(() => {
    getAllInvoice();
  }, [currentPage, limitPerPage, sortValue, debounceValue]);

  const getAllInvoice = async () => {
    let params = { page: currentPage, limit: limitPerPage, type: 2 };
    if (debounceValue) {
      params.search = debounceValue.trim();
    }
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

  const handleShowModalExport = () => {
    setShowModalExport(!showModalExport);
  };

  const handleShowBill = (item) => {
    setShowBill(!showBill);
    setBillData(item);
  };

  const handleAddExportInvoice = async (data) => {
    console.log(data);
    const { products, createdBy, searchName } = data;
    try {
      if (products.length >= 1) {
        await invoiceAPI.createExportInvoice({ products, createdBy, searchName });
      }
      await getAllInvoice();
    } catch (error) {
      console.log(error);
    }
    setShowModalExport(false);
  };
  return (
    <PageLayout title="Hàng Lỗi/Hết Hạn">
      <Filter
        invoices={invoices}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPageCount={totalPageCount}
        limitPerPage={limitPerPage}
        setLimitPerPage={setLimitPerPage}
        sortValue={sortValue}
        setSortValue={setSortValue}
        handleShowModalExport={handleShowModalExport}
        setSearchKeyWord={setSearchKeyWord}
      />
      {showModalExport && (
        <AddModalExport
          closeModal={handleShowModalExport}
          title="PHIẾU XUẤT HÀNG"
          titleBtnFooter="LƯU"
          handleAddExportInvoice={handleAddExportInvoice}
        />
      )}
      {showBill && <Bill close={handleShowBill} invoice={billData} />}
      <ExportTable
        invoices={invoices}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPageCount={totalPageCount}
        limitPerPage={limitPerPage}
        setLimitPerPage={setLimitPerPage}
        handleShowBill={handleShowBill}
      />
    </PageLayout>
  );
}
