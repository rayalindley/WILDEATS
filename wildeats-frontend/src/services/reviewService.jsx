import api from '../api/axios';

const reviewService = {
    getByItem: async (itemId) => {
        const res = await api.get(`/reviews/item/${itemId}`);
        return res.data;
    },

    getByShop: async (shopId) => {
        const res = await api.get(`/reviews/shop/${shopId}`);
        return res.data;
    },

    submit: async (reviewData) => {
        const res = await api.post('/reviews', reviewData);
        return res.data;
    },
};

export default reviewService;