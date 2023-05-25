import axios from "./axios";

import { USER_ROLES } from "../utils/Constant";

const staffAPI = {
  getAllStaff: async (params) => {
    const url = "/users";
    const response = await axios.get(url, { params });
    return response;
  },
  addStaff: async (data) => {
    const url = "/users/register-staff";
    await axios.post(url, data);
  },
  uploadAvatar: async (data) => {
    const url = "/upload";
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  },
  updateStaff: async (id, data) => {
    const url = `/users/${id}`;
    await axios.patch(url, data);
  },
  updateStaffStatus: async (id, data) => {
    const url = `/users/updateStatus/${id}`;
    await axios.patch(url, data);
  },
  updateManyStaffStatus: async (data) => {
    const url = "/users/updateStatus";
    await axios.patch(url, { data});
  },
  deleteStaff: async (id) => {
    const url = `/users/${id}`;
    await axios.delete(url);
  },
  deleteManyStaff: async (data) => {
    const url = "/users";
    console.log(data);
    await axios.delete(url, {data});
  },
};
export default staffAPI;
