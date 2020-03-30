import axios from '../configApi';

export const resendResetPassword = async (data) => {
  try {
    const res = await axios.post('api/en/data-search/otp/reset-password',data);
    
    return res.data;
    
  } catch (error) {

    return Promise.reject(error);

  }
};
