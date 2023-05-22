import axios from "./axios";

const orderAPI = {
  getOrdersByUserId: async (userId) => {
    const url = `orders/user/${userId}`;
    const response = await axios.get(url);
    return response;
  },
};

export default orderAPI;
