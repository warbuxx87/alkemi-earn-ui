import axios from '../configApi';

export const login = async (data) => {
  try {

    const res = await axios.post('api/en/data-search/auth/sign-in',data);
    
    localStorage.setItem('token',res.data.data.token)

    localStorage.setItem('user',JSON.stringify(res.data.data))
    
    return res.data.data;
    
  } catch (error) {

    return Promise.reject(error);

  }
};
