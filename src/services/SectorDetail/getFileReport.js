import axios from '../configApi';
const locale = 'en';
export const getFileReport = async (data) => {
  try {

    const res = await axios.post(`api/${locale}/data-search/report/file`,data);
    
    return res.data;
    
  } catch (error) {

    return Promise.reject(error);

  }
};
