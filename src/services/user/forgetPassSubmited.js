import axios from '../configApi';

export const forgetPassSubmited = async (data) => {
  try {

    const res = await axios.post('api/en/data-search/auth/forgot-password',data);
   
    return res.data.data;
    
  } catch (error) {

    return Promise.reject(error);

  }
};
