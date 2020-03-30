import axios from '../configApi';
const locale = 'en';

export const removeCard = async (id) => {
  try {
    const result = await axios(`api/${locale}/data-search/payment-method/card/${id}`, { 
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
      })

    return result.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
