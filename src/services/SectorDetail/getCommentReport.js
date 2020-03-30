import axios from '../configApi';
const locale = 'en';
export const getCommentReport = async (data) => {
  try {

    const res = await axios.post(`api/${locale}/data-search/report/comment`,data);
    
    return res.data;
    
  } catch (error) {

    return Promise.reject(error);

  }
};
