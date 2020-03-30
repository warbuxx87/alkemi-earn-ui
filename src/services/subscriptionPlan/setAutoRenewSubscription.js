import axios from '../configApi';
const locale = 'en';

export const setAutoRenewSubscriptionAPI = async (data) => {
  try {
    const result = await axios(`api/${locale}/data-search/subscription-plan/auto-renew`, { 
        method: "POST",
        data: data,
        headers: {
          Accept: "application/json",
        },
      })

    return result.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
