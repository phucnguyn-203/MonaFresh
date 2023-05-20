import { useState, useEffect } from "react";

import PageLayout from "../../components/layout/pageLayout";
import CustomerTable from "../../components/customer/CustomerTable/CustomerTable";
import customerAPI from "../../api/customer";
import { USER_ROLES } from "../../utils/Constant";
import useDebounce from "../../hooks/useDebounce";

export default function Customer() {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [limitPerPage, setLimitPerPage] = useState(10);
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const debounceValue = useDebounce(searchKeyWord, 500);

  useEffect(() => {
    getAllCustomer();
  }, [currentPage, limitPerPage, debounceValue]);

  const getAllCustomer = async () => {
    let params = { page: currentPage, limit: limitPerPage, role: [USER_ROLES.CUSTOMER] };
    if (debounceValue) {
      params.search = debounceValue.trim();
    }
    try {
      const response = await customerAPI.getAllCustomer(params);
      if (response.data.length === 0 && response.currentPage !== 1) {
        setCurrentPage(response.currentPage - 1);
      }
      setCustomers(response.data);
      setTotalPageCount(response.totalPages);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <PageLayout title="Khách hàng">
      <div className="bg-white rounded-lg ring-1 ring-gray-200 ring-opacity-4 overflow-hidden mb-5 shadow-xs">
        <div className="p-4">
          <form className="py-3 grid gap-4 ">
            <div className="flex-grow-0">
              <input
                type="text"
                name="searchKeyWord"
                value={searchKeyWord}
                placeholder="Tìm khách hàng theo tên"
                className="block w-full px-3 py-1 text-sm focus:outline-none leading-5 rounded-md focus:border-gray-200 border-gray-200 border h-12 bg-gray-100 border-transparent focus:bg-white"
                onChange={(e) => setSearchKeyWord(e.target.value)}
              />
            </div>
          </form>
        </div>
      </div>
      <CustomerTable
        customers={customers}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPageCount={totalPageCount}
        limitPerPage={limitPerPage}
        setLimitPerPage={setLimitPerPage}
      />
    </PageLayout>
  );
}
