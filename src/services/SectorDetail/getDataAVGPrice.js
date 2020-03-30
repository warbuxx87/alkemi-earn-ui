import axios from '../configApi';
const locale = 'en';

export const getDataAVGPrice = async (prms) => {
  try {
    const result = await axios(`api/${locale}/data-search/subscribed-item/avg-price?`, {
        method: "GET",
        params: prms,
        headers: {
          Accept: "application/json",
        },
      })
    return result.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
