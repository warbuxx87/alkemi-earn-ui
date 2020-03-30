import axios from '../configApi';
const locale = 'en';

export const getListCountriesAPI = async () => {
  try {
    const result = await axios(`api/${locale}/data-search/country`, { 
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
