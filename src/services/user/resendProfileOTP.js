import axios from '../configApi';
const locale = 'en';

export const resendProfileOTP = async () => {
  try {
    const res = await axios(`api/${locale}/data-search/otp/profile`,{
      method: "POST",
      headers: {
        Accept: "application/json"
      },
    });
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
