import axios from "./axios";

const userAPI = {
  login: async (email, password) => {
    const url = "users/login";
    return axios.post(url, { email, password });
  },
  logout: async () => {
    const url = "/users/logout";
    await axios.get(url);
  },
  signUp: async (data) => {
    const { name, email, phone, password, passwordConfirm } = data;
    const url = "/users/signup";
    await axios.post(url, { name, email, phone, password, passwordConfirm });
  },
  updatePassword: async (data) => {
    const url = "/users/updatePassword";
    await axios.patch(url, data);
  },
  checkIsLogin: async () => {
    const url = "/users/check-login";
    const response = await axios.get(url);
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
  updateInfo: async (data) => {
    const url = "/users/updateMe";
    await axios.patch(url, data);
  },
};

export default userAPI;
