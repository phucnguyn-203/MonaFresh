import axios from "./axios";

const productAPI = {
  getAllProduct: async (params) => {
    const url = "/products";
    const response = await axios.get(url, { params });
    return response;
  },
  getOneProduct: async (id) => {
    const url = `/products/${id}`;
    const response = await axios.get(url);
    return response;
  },
  getSimilarProducts: async (params) => {
    const url = "/products/similar";
    const response = await axios.get(url, { params });
    return response;
  },
  getAllFeedback: async (id, params) => {
    const url = `/products/${id}/feedbacks`;
    const response = await axios.get(url, { params });
    return response;
  },
  createFeedback: async (id, data) => {
    const url = `/products/${id}/feedbacks`;
    const response = await axios.post(url, data)
    console.log(response);
  },
 
};

export default productAPI;
