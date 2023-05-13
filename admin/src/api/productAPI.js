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
  deleteProduct: async (id) => {
    const url = `/products/${id}`;
    await axios.delete(url);
  },

  deleteManyProduct: async (productIds) => {
    const url = "/products";
    await axios.delete(url, { data: { productIds } });
  },
};

export default productAPI;
