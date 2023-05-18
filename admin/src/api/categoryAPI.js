import axios from "./axios";

const categoryAPI = {
  getAllCategory: async (params) => {
    const url = "/categories";
    const response = await axios.get(url, { params });
    return response;
  },
  createCategory: async (data) => {
    const { name } = data;
    const url = "/categories";
    await axios.post(url, { name });
  },
  updateCategory: async (id, data) => {
    const url = `/categories/${id}`;
    await axios.patch(url, data);
  },
  updateManyCategory: async (data) => {
    const url = "/categories";
    await axios.patch(url, { data });
  },
  deleteCategory: async (id) => {
    const url = `/categories/${id}`;
    await axios.delete(url);
  },
  deleteManyCategory: async (categoryIds) => {
    const url = "/categories";
    await axios.delete(url, { data : {categoryIds}});
  },
};

export default categoryAPI;
