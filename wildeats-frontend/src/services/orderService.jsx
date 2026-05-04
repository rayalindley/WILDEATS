import api from '../api/axios';

const orderService = {
    getByUser: async (userId) => {
        const res = await api.get(`/orders/user/${userId}`);
        return res.data;
    },

    checkout: async (orderData) => {
        const res = await api.post('/orders', orderData);
        return res.data;
    },
};

export default orderService;