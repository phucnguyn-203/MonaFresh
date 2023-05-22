import axios from "./axios";

const orderAPI = {
  createOrder: async (data) => {
    const url = "/orders";
    const response = await axios.post(url, data);
    return response;
  },
};

export default orderAPI;
