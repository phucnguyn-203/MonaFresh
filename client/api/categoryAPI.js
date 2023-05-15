import axios from "./axios";

const categoryAPI = {
  getAllCategory: async () => {
    const url = "/categories";
    const response = await axios.get(url);
    return response;
  },
};

export default categoryAPI;
