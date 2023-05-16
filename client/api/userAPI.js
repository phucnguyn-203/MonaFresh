import axios from "./axios";

const userAPI = {
  signUp: async (data) => {
    const { name, email, phone, password, passwordConfirm } = data;
    const url = "/users/signup";
    await axios.post(url, { name, email, phone, password, passwordConfirm });
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
