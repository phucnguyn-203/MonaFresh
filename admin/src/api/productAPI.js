import axios from "./axios";

const productAPI = {
  getAllProduct: async (params) => {
    const url = "/products";
    const response = await axios.get(url, { params });
    return response;
  },

  createProduct: async (data) => {
    const url = "/products";
    await axios.post(url, data);
  },
  updateProduct: async (id, data) => {
    const url = `/products/${id}`;
    await axios.patch(url, data);
  },
  updateManyProduct: async (data) => {
    const url = "/products";
    await axios.patch(url, { data });
  },
  deleteProduct: async (id) => {
    const url = `/products/${id}`;
    await axios.delete(url);
  },

  deleteManyProduct: async (productIds) => {
    const url = "/products";
    await axios.delete(url, { data: { productIds } });
  },
  checkInventory: async (orderDetail) => {
    const url = "/products/check-inventory";
    await axios.post(url, { orderDetail });
  },
  updateInventory: async (orderDetail) => {
    const url = "/products/update-inventory";
    await axios.patch(url, { orderDetail });
  },
  returnInventory: async (orderId) => {
    const url = `/products/return-inventory/${orderId}`;
    await axios.patch(url);
  },
};

export default productAPI;
