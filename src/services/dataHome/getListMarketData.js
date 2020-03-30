import axios from '../configApi';
const locale = 'en';

export const getListMarketData = async (params) => {
    try {
        const result = await axios(`api/${locale}/data-search/latest-price`, { 
        method: "POST",
        headers: {
            Accept: "application/json",
        },
        data : params
        })
        return result.data;
    } catch (error) {
        return Promise.reject(error);
    }
};