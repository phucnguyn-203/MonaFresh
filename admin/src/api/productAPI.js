import axios from "./axios";

const productAPI = {
  getAllProduct: async () => {
    const url = "/products";
    const response = await axios.get(url);
    return response;
  },

  addProduct: async (data) => {
    const url = "/products";
    await axios.post(url, data);
  },
  updateProduct: async (id, data) => {
    const url = `/products/${id}`;
    await axios.patch(url, data);
  },
  deleteProduct: async (id) => {
    const url = `/products/${id}`;
    await axios.delete(url);
  },
  uploadThumbnail: async (data) => {
    const url = "/upload";
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  },
  uploadImagesProduct: async (data) => {
    const url = "/upload/upload-files";
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  },
};

export default productAPI;
