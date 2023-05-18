import axios from "./axios";

const uploadFileApi = {
  uploadSingleFile: async (data) => {
    const url = "/upload";
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  },

  uploadMutipleFile: async (data) => {
    const url = "/upload/upload-files";
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  },
};

export default uploadFileApi;
