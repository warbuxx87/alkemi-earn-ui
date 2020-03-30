
import * as types from './actionTypes';
const initialState = {
    user: [],
    user_login: {},
    islogin: localStorage.getItem('token') ? true : false,
    user_storage: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    is_sign_up:false,
    error_sign_up:{
      isError: false,
      message:'',
    },
    error_login:{
      isError: false,
      message:'',
    },
    is_forget:false,
    error_user_forget_default:{
      isError: false,
      message:'',
    },
    info_number:{},
    error_user_forget_submited:{
      isError: false,
      message:'',
    },
    user_forger_submit:{

    },
    error_user_update_profile:{
      isError: false,
      message:'',
    },
    isUpdateProfile: false,
    sendOTP : {
      verify_otp : false,
      country_code :  '',
      phone_number : '',
      formData : null
    },
    statusForget: 1,
    error_user_reset_password:{
      isError: false,
      message:'',
    },
    resetPassword: false,
    user_reset_password:{},
    tokenExpired : false,
    isResend: false,
    resend_reset_password_error:{
      isError: false,
      message:'',
    }
  };

  // Redux: Counter Reducer
  const User = (state = initialState, action) => {
    switch (action.type) {
      case  types.GET_LIST_USER_REDUCER : {
        return {
          ...state,
          user : action.listUser
        };
      }
      case  types.USER_LOGIN_REDUCER : {
        return {
          ...state,
          user_login: action.user_login,
          islogin: true,
          tokenExpired : false,
        };
      }
      case  types.USER_LOGIN_FAIL : {
        return {
          ...state,
          error_login : action.user_login_error
        };
      }
      case  types.USER_SIGN_UP_REDUCER : {
        return {
          ...state,
          user_sign_up : true
        };
      }
      case  types.USER_SIGN_UP_FAIL : {
        return {
          ...state,
          error_sign_up : action.user_sign_up_error,
          islogin: false
        };
      }
      case  types.USER_FORGET_PASSWORD_DEFAULT : {
        return {
          ...state,
          is_forget : true,
          info_number: action.info_number,
          statusForget : 2
        };
      }
      case  types.USER_FORGET_PASSWORD_DEFAULT_FAIL : {
        return {
          ...state,
          error_user_forget_default : action.user_forget_default_error
        };
      }
      case  types.USER_FORGET_PASSWORD_SUBMITED : {
        return {
          ...state,
          is_forget : true,
          statusForget : 3,
          user_forger_submit :action.user_forget_password_submited
        };
      }
      case  types.USER_FORGET_PASSWORD_SUBMITED_FAIL : {
        return {
          ...state,
          error_user_forget_submited : action.user_forget_submited_error
        };
      }
      case types.USER_LOGOUT_REDUCER : {
        return {
          ...state,
          user: [],
          islogin: false,
          tokenExpired : false
        };
      }
      case  types.USER_UPDATE_PROFILE_FAIL : {
        return {
          ...state,
          error_user_update_profile : action.error,
        };
      }
      case  types.USER_UPDATE_PROFILE_REDUCER : {
        return {
          ...state,
          user_login: action.user,
          isUpdateProfile: true,
          sendOTP : {
            verify_otp : false,
            country_code :  '',
            phone_number : '',
            formData : null
          }
        };
      }
      case  types.USER_ISUPDATE_PROFILE : {
        return {
          ...state,
          isUpdateProfile: action.isUpdateProfile
        };
      }
      case  types.USER_UPDATE_PROFILE_SENDOTP : {
        return {
          ...state,
          sendOTP: action.OTP
        };
      }
      case  types.USER_UPDATE_STATUS_RESET : {
        return {
          ...state,
          statusForget : 1,
          resetPassword: false,
          error_user_reset_password:{
            isError: false,
            message:'',
          },
          resend_reset_password_error:{
            isError: false,
            message:'',
          },
          isResend: false,
          error_user_forget_default:{
            isError: false,
            message:'',
          },
          error_user_forget_submited:{
            isError: false,
            message:'',
          },
          error_sign_up:{
            isError: false,
            message:'',
          },
          error_login:{
            isError: false,
            message:'',
          }
        };
      }
      case  types.USER_RESET_PASSWORD_REDUCER : {
        return {
          ...state,
          resetPassword : true,
          user_reset_password : action.user_reset_password
        };
      }
      case  types.USER_RESEND_RESET_PASSWORD_REDUCER : {
        return {
          ...state,
          isResend : true,
          resend_reset_password_error: {
            isError: false,
            message: ''
          },
        };
      }
      case types.USER_RESEND_RESET_PASSWORD_FAIL: {
        return {
          ...state,
          resend_reset_password_error: action.resend_reset_password_error,
          isResend: false
        }
      }
      case  types.USER_RESET_PASSWORD_FAIL : {
        return {
          ...state,
          error_user_reset_password : 1
        };
      }
      case types.TOKEN_EXPIRED_REDUCER : {
        return {
          ...state,
          user: [],
          tokenExpired : true
        };
      }
      case types.USER_LOCAL_STORAGE_REDUCER: {
        return {
          ...state,
          user_storage: action.user_storage
        }
      }
      default: {
        return state;
      }
    }
  };
  // Exports
  export default User;