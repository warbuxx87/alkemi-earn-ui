import axios from '../configApi';

export const forgetPassDefault = async (data) => {
  try {

    const res = await axios.post('api/en/data-search/auth/forgot-password',data);
    
    return res.data.data;
    
  } catch (error) {

    return Promise.reject(error);

  }
};
