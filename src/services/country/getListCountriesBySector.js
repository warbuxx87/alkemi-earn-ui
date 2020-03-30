import axios from '../configApi';
const locale = 'en';

export const getListCountriesBySector = async (data) => {
  try {
    const result = await axios(`api/${locale}/data-search/latest-price/country`, { 
        method: "POST",
        data: data,
        headers: {
          Accept: "application/json",
        }
      })

    return result.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
