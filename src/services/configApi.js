// import axios from 'axios';

// const token = localStorage.getItem('token');
// // const token = '***REMOVED***';
// const APIInstance = axios.create({
//   baseURL: `${process.env.REACT_APP_DOMAIN_API}`,
// });

// // export const setToken = (token) => {
// //   if(token)
 
// // };

// // setToken(token);
// APIInstance.defaults.headers.common['USER-TOKEN'] = token;
// export default APIInstance;

// First we need to import axios.js
import * as request from 'axios';
// Next we make an 'instance3' of it
const axios = request.create({
  baseURL: `${process.env.REACT_APP_DOMAIN_API}`,
});

axios.interceptors.request.use(
async config => {
const token = await localStorage.getItem('token')
if (token) {
config.headers.common['USER-TOKEN'] = token;
}
return config
},
error => {
return Promise.reject(error)
}
);
// Where you would set stuff like your 'Authorization' header, etc ...
// let token = await AsyncStorage.getItem("token");
//axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

// Also add/ configure interceptors && all the other cool stuff



export default axios;