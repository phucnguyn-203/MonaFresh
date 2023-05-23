import axios from "./axios";

const orderAPI = {
  createOrder: async (data) => {
    const url = "/orders";
    const response = await axios.post(url, data);
    return response;
  },
  getMyOrder: async (params) => {
    const url = "/orders/my-orders";
    const response = await axios.get(url, { params });
    return response;
  },
  updateIsFeedbackOfOneItem: async (data) => {
    const url = "/orders/update-is-feedback";
    const response = await axios.patch(url, data);
    return response;
  },
  updateOrder: async (id, data) => {
    const url = `orders/${id}`;
    await axios.patch(url, data);
  },
};



export default orderAPI;
