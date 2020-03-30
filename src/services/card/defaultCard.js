import axios from '../configApi';
const locale = 'en';

export const defaultCard = async (id) => {
  try {
    const result = await axios(`api/${locale}/data-search/payment-method/default-card`, { 
        method: "POST",
        data: {
          card : id
        },
        headers: {
          Accept: "application/json",
        },
      })

    return result.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
