import axios from '../configApi';

export const resetPassword = async (data) => {
  try {
    const res = await axios.post('api/en/data-search/auth/reset-password',data);
    
    return res.data;
    
  } catch (error) {

    return Promise.reject(error);

  }
};
