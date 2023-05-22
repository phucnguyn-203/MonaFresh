import axios from "./axios";

const orderAPI = {
  getAllOrder: async (params) => {
    const url = "/orders";
    const response = await axios.get(url, { params });
    return response;
  },
  getOrdersByUserId: async (userId) => {
    const url = `orders/user/${userId}`;
    const response = await axios.get(url);
    return response;
  },
};

export default orderAPI;
