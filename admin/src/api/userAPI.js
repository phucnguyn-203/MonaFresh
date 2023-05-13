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
  forgotPassword: async (data) => {
    const url = "/users/forgotPassword";
    await axios.post(url, data);
  },
  resetPassword: async (data, resetToken) => {
    const url = `/users/resetPassword/${resetToken}`;
    await axios.patch(url, data);
  },
  getStatusResetPasswordToken: async (resetToken) => {
    const url = `/users/resetPassword/${resetToken}`;
    await axios.get(url);
  },
};

export default userAPI;
