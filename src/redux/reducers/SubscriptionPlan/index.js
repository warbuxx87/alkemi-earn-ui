
import * as types from './ActionType';
const initialState = {
    subscriptions:[],
    auto_renew_fail:{
      isError: false,
      message:'',
      isLoad: true
    },
  };
  // Redux: Counter Reducer
  const SubscriptionPlan = (state = initialState, action) => {
    switch (action.type) {
      case  types.GET_SUBSCRIPTION_PLAN_REDUCER : {
        return {
          ...state,
          subscriptions : action.listData
        };
      }
      case  types.SET_AUTO_RENEW_SUBSCRIPTION_PLAN_REDUCER : {
        return {
          ...state,
          auto_renew_fail : action.error
        };
      }
      default: {
        return state;
      }
    };
  };
  // Exports
  export default SubscriptionPlan;