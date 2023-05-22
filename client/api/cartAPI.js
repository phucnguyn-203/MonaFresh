import axios from "./axios";

const cartAPI = {
  getItemsInCart: async () => {
    const url = "/carts";
    const response = await axios.get(url);
    return response;
  },
  addAnItemToCart: async (data) => {
    const url = "/carts/item";
    const { productId, quantity } = data;
    const response = axios.post(url, { productId, quantity });
    return response;
  },

  updateQuantityOfAnItem: async (id, data) => {
    const url = `/carts/item/${id}`;
    const response = await axios.patch(url, data);
    return response;
  },

  deleteAnItemInCart: async (id) => {
    const url = `/carts/item/${id}`;
    const response = await axios.delete(url);
    return response;
  },
  deleteManyItemInCart: async (data) => {
    const { itemIds } = data;
    const url = `/carts/item`;
    const response = await axios.delete(url, { data: { itemIds } });
    return response;
  },
};

export default cartAPI;
