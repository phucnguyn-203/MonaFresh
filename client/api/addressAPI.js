import axios from "./axios";

const addressAPI = {
  getAllProvinces: async (data) => {
    const url = "/address/provinces";
    const response = await axios.get(url, data);
    return response;
  },

  getAllDistricts: async (params) => {
    const url = "/address/districts";
    const response = await axios.get(url, { params });
    return response;
  },
  getAllWards: async (params) => {
    const url = "/address/wards";
    const response = await axios.get(url, { params });
    return response;
  },
};

export default addressAPI;
