import axios from '../configApi';

export const getListUser = async () => {
  try {
    const res = await axios.get('https://jsonplaceholder.typicode.com/todos');
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
