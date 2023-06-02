import axios from "./axios";

const statisticAPI = {
  getTodayProfit: async () => {
    const url = "/statistic/today-profit";
    const response = await axios.get(url);
    return response;
  },
  getTotalCustomer: async () => {
    const url = "/statistic/total-customer";
    const response = await axios.get(url);
    return response;
  },
  getTotalProduct: async () => {
    const url = "/statistic/total-product";
    const response = await axios.get(url);
    return response;
  },
  getTotalProductsOutofStock: async () => {
    const url = "/statistic/product-outofstock";
    const response = await axios.get(url);
    return response;
  },
  getOrdersStatistic: async () => {
    const url = "/statistic/orders";
    const response = await axios.get(url);
    return response;
  },
  getTopSellingProducts: async () => {
    const url = "/statistic/top-selling-products";
    const response = await axios.get(url);
    return response;
  },
  getProfitInMonth: async () => {
    const url = "/statistic/profit-in-month";
    const response = await axios.get(url);
    return response;
  },
  getExportExcel: async () => {
    const url = "/statistic/export-excel";
    const response = await axios.get(url, { responseType: "blob" });
    return response;
  },
};

export default statisticAPI;
