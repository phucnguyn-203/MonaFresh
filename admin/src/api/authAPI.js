import axios from "./axios";

const authAPI = {
    login: async (email, password) => {
        const url = "/users/login";
        const response = await axios.post(url, { email, password });
        return response;
    },
};

export default authAPI;
