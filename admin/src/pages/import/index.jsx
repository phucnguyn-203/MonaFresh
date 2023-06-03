import React, { useEffect, useState } from "react";

import PageLayout from "../../components/layout/pageLayout";
import AddModalImport from "../../components/import/addModalImport";
import invoiceAPI from "../../api/invoiceAPI";
import ImportTable from "../../components/import/ImportTable";
import useDebounce from "../../hooks/useDebounce";
import Bill from "../../components/import/Bill";
import Filter from "../../components/import/Fillter";

export default function Import() {
  const [showModalImport, setShowModalImport] = useState(false);
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
    let params = { page: currentPage, limit: limitPerPage, type: 1 };
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

  const handleShowModalImport = () => {
    setShowModalImport(!showModalImport);
  };

  const handleShowBill = (item) => {
    setShowBill(!showBill);
    setBillData(item);
  };

  const handleAddImportInvoice = async (data) => {
    const { products, createdBy, searchName } = data;
    try {
      if (products.length >= 1) {
        await invoiceAPI.createImportInvoice({ products, createdBy, searchName });
      }
      await getAllInvoice();
    } catch (error) {
      console.log(error);
    }
    setShowModalImport(false);
  };
  return (
    <PageLayout title="Hàng Lỗi">
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
        setSearchKeyWord={setSearchKeyWord}
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
        handleShowBill={handleShowBill}
      />
    </PageLayout>
  );
}
