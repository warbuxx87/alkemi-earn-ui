import axios from '../configApi';
const locale = 'en';

export const getListSectorDetailAPI = async () => {
  try {
    const result = await axios(`api/${locale}/data-search/sector/detail`, { 
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
