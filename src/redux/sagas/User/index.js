import { all } from 'redux-saga/effects';
import getUsers from './getUsers';
import userLogin from './userLogin';
import userSignIn from './userSignUp';
import userForgetPassDefault from './userForgetPassDefault';
import userForgetPassSubmited from './userForgetPassSubmited';
import getProfile from './getProfile';
import logout from './logout';
import updateProfile from './updateProfile';
import userResetPassword from './userResetPassowrd';
import tokenExpired from './tokenExpired';
import userResendResetPassword from './userResendResetPassword';

export const userSagas = function* root() {
  yield all([
    getUsers(),
    userLogin(),
    userSignIn(),
    userForgetPassDefault(),
    userForgetPassSubmited(),
    getProfile(),
    logout(),
    updateProfile(),
    userResetPassword(),
    tokenExpired(),
    userResendResetPassword()
  ]);
};
