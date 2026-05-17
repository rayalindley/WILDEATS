import api from '../api/axios';

const shopService = {
  getAllShops: async () => {
    const response = await api.get('/shops');
    return response.data;
  },

  getShop: async (id) => {
    const response = await api.get(`/shops/${id}`);
    return response.data;
  },

  getMenuByShop: async (shopId) => {
    const response = await api.get(`/menus/shop/${shopId}`);
    return response.data;
  },
};

export default shopService;