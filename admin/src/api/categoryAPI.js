import axios from "./axios";

const categoryAPI = {
  getAllCategory: async () => {
    const url = "/categories";
    const response = await axios.get(url);
    return response;
  },
  addCategory: async (data) => {
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
};

export default categoryAPI;
