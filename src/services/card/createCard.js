import axios from '../configApi';
const locale = 'en';

export const createCardMethod = async (data) => {
  try {
    const result = await axios(`api/${locale}/data-search/payment-method/card`, { 
        method: "POST",
        data: data,
        headers: {
          Accept: "application/json",
        },
      })

    return result.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
