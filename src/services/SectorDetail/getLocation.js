import axios from '../configApi';
const locale = 'en';

export const getLocationAPI = async (prms) => {
  try {
    const result = await axios(`api/${locale}/data-search/location/detail?`, { 
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
