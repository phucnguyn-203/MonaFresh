import axios from "axios";

const invoiceAPI = {
    createImportInvoice: async (data) => {
        const url = "/invoices/in";
        await axios.post(url, data);
    },
    createExportInvoice: async (data) => {
        const url = "/invoices/out";
        await axios.post(url, data);
    },
    updateInvoice: async (data) => {
        const url = `/invoices/${id}`;
        await axios.patch(url, data); //data{updatedProducts, updatedCreatedBy, type}
    }
}