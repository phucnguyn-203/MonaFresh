import axios from "./axios";

const categoryAPI = {
  getAllCategory: async (searchKeyWord) => {
    const url = "/categories";
    const params = {};
    if (searchKeyWord) {
      params.search = searchKeyWord.trim();
    }
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
  deleteCategory: async (id) => {
    const url = `/categories/${id}`;
    await axios.delete(url);
  },
  deleteManyCategory: async (data) => {
    const url = "/categories";
    await axios.delete(url, { data: { categoryIds: data } });
  },
};

export default categoryAPI;
