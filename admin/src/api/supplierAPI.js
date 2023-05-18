import axios from "./axios";

const supplierAPI = {
  // getAllSupplier: async (searchKeyWord) => {
  //   const url = "/suppliers";
  //   const params = {};
  //   if (searchKeyWord.trim()) {
  //     params.searchKeyWord.trim();
  //   }
  //   const response = await axios.get(url, { params });
  //   return response;
  // },

  getAllSupplier: async (params) => {
    const url = "/suppliers";
    const response = await axios.get(url, { params });
    return response;
  },

  addSupplier: async (data) => {
    const url = "/suppliers";
    await axios.post(url, data);
  },
  updateSupplier: async (id, data) => {
    const url = `/suppliers/${id}`;
    await axios.patch(url, data);
  },
  updateManySupplier: async (data) => {
    const url = "/suppliers";
    await axios.patch(url, { data });
  },
  deleteSupplier: async (id) => {
    const url = `/suppliers/${id}`;
    await axios.delete(url);
  },
  deleteManySupplier: async (data) => {
    const url = "/suppliers";
    await axios.delete(url, { data: { supplierIds: data } });
  },
};

export default supplierAPI;
