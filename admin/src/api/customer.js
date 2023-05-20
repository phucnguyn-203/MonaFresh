import axios from "./axios";

const customerAPI = {
  getAllCustomer: async (params) => {
    const url = "/users";
    const response = await axios.get(url, { params });
    return response;
  },
};
export default customerAPI;
