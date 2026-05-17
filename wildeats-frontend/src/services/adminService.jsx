import api from '../api/axios';

const adminService = {
  // ==================== SHOPS ====================
  getAllShops: async () => {
    const response = await api.get('/admin/shops');
    return response.data;
  },

  getShop: async (id) => {
    const response = await api.get(`/admin/shops/${id}`);
    return response.data;
  },

  createShop: async (shopData) => {
    const response = await api.post('/admin/shops', shopData);
    return response.data;
  },

  updateShop: async (id, shopData) => {
    const response = await api.put(`/admin/shops/${id}`, shopData);
    return response.data;
  },

  deleteShop: async (id) => {
    await api.delete(`/admin/shops/${id}`);
  },

  // ==================== MENU ITEMS ====================
  getAllMenuItems: async () => {
    const response = await api.get('/admin/menus');
    return response.data;
  },

  getMenuByShop: async (shopId) => {
    const response = await api.get(`/admin/menus/shop/${shopId}`);
    return response.data;
  },

  createMenuItem: async (itemData) => {
    const response = await api.post('/admin/menus', itemData);
    return response.data;
  },

  updateMenuItem: async (id, itemData) => {
    const response = await api.put(`/admin/menus/${id}`, itemData);
    return response.data;
  },

  deleteMenuItem: async (id) => {
    await api.delete(`/admin/menus/${id}`);
  },
};

export default adminService;
