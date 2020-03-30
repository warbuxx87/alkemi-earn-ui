import axios from '../configApi';
const locale = 'en';

export const getListCategoryAPI = async () => {
  try {
    const result = await axios(`api/${locale}/data-search/sector`, { 
        method: "GET",
        headers: {
          Accept: "application/json",
          "USER-TOKEN": "",
        },
      })

    return result.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
