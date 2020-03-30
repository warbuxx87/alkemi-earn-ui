import axios from '../configApi';

export const sign_up = async (data) => {
  try {

    const res = await axios.post('api/en/data-search/auth/sign-up',data);

    return res.data;
  
  } catch (error) {
  
    return Promise.reject(error);
  
  }
};
