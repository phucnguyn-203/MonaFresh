import axios from "./axios";

const UserAPI = {
  signUp: async (data) => {
    const { name, email, phone, password, passwordConfirm } = data;
    const url = "/users/signup";
    await axios.post(url, { name, email, phone, password, passwordConfirm });
  },
};

export default UserAPI;
