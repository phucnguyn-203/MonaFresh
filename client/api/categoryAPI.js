import axios from "./axios";

const categoryAPI = {
  getAllCategory: async (params) => {
    const url = "/categories";
    const response = await axios.get(url, { params });
    return response;
  },
};

export default categoryAPI;
