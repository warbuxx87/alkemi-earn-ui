import axios from '../configApi';
const locale = 'en';

export const getListCard = async (data) => {
  try {
    const result = await axios(`api/${locale}/data-search/payment-method`, { 
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      })

    return result.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
