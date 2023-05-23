import axios from "./axios";

const orderAPI = {
  getAllOrder: async (params) => {
    const url = "/orders";
    const response = await axios.get(url, { params });
    return response;
  },
  getOrdersByUserId: async (userId, params) => {
    const url = `/orders/user/${userId}`;
    const response = await axios.get(url, { params });
    return response;
  },
  updaterOrder: async (id, data) => {
    const url = `/orders/${id}`;
    await axios.patch(url, data);
  },
};

export default orderAPI;
