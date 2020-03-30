import axios from '../configApi';
const locale = 'en';

export const getStatsAPI = async (prms) => {
  try {
    const result = await axios(`api/${locale}/data-search/subscribed-item/stats?`, { 
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
