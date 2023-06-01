import axios from "./axios";

const notificationAPI = {
  getAllNotification: async () => {
    const url = "/notifications";
    const response = await axios.get(url);
    return response;
  },
  updateNotification: async (id) => {
    const url = `/notifications/${id}`;
    const response = await axios.patch(url);
    return response;
  },
};

export default notificationAPI;
