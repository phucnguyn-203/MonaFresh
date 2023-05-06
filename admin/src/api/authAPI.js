import axios from "./axios";

const authAPI = {
    login: async (email, password) => {
        const url = "/users/login";
        const response = await axios.post(url, { email, password });
        return response;
    },
    checkIsLogin: async () => {
        const url = "/users/check-login";
        const response = await axios.get(url);
        return response;
    },
    logout: async () => {
        const url = "/users/logout";
        await axios.get(url);
    },
};

export default authAPI;
