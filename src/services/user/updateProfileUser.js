import axios from '../configApi';
const locale = 'en';

export const updateProfileUser = async (data) => {
  try {
    const res = await axios(`api/${locale}/data-search/profile`,{
      method: "POST",
      data : data,
      headers: {
        Accept: "application/json"
      },
    });
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
