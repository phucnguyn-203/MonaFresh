import axios from "./axios";

const userAPI = {
  updatePassword: async (data) => {
    const url = "/users/updatePassword";
    await axios.patch(url, data);
  },
  updateInfo: async (data) => {
    const url = "/users/updateMe";
    await axios.patch(url, data);
  },
  updateAvatar: async (data) => {
    const url = "/upload";
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  },
};

export default userAPI;
