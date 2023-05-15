import axios from "./axios";

const productAPI = {
  getAllProduct: async (params) => {
    const url = "/products";
    const response = await axios.get(url, { params });
    return response;
  },
  getOneProduct: async (id) => {
    const url = `/products/${id}`;
    const response = await axios.get(url, id);
    return response;
  },
};

export default productAPI;