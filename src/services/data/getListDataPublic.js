import axios from '../configApi';
const locale = 'en';

export const getListDataPublic = async (data) => {
  try {
    const result = await axios(`api/${locale}/data-search/latest-price`, { 
        method: "POST",
        data : data,
        headers: {
          Accept: "application/json",
          'USER-TOKEN': ''
        },
      })
    return result.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
