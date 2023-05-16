import axios from "./axios";

const userAPI = {
  login: async (email, password) => {
    const url = "users/login";
    return axios.post(url, { email, password });
  },
  signUp: async (data) => {
    const { name, email, phone, password, passwordConfirm } = data;
    const url = "/users/signup";
    await axios.post(url, { name, email, phone, password, passwordConfirm });
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
};

export default userAPI;
