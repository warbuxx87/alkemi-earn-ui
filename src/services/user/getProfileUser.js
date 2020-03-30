import axios from '../configApi';
const locale = 'en';

export const getProfileUser = async () => {
  try {
    const res = await axios.get(`api/${locale}/data-search/profile`,{
      method: "GET",
      headers: {
        Accept: "application/json",
        "USER-TOKEN": localStorage.getItem('token'),
      },
    });
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
