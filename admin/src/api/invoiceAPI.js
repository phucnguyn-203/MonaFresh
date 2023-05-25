import axios from "./axios";

const invoiceAPI = {
  createImportInvoice: async (data) => {
    const url = "/invoices/in";
    await axios.post(url, data);
  },
  createExportInvoice: async (data) => {
    const url = "/invoices/out";
    await axios.post(url, data);
  },
  updateInvoice: async (id, data) => {
    const url = `/invoices/${id}`;
    await axios.patch(url, data);
  },
  getAllInvoice: async (params) => {
    const url = "/invoices";
    const response = await axios.get(url, { params });
    return response;
  },
};

export default invoiceAPI;
