import * as actionTypes from "./actionsTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userId: userId
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationTime");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDkMC9JLuxNWXe7Bj2urq0vl2-x71X02pA";
    if (!isSignup) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDkMC9JLuxNWXe7Bj2urq0vl2-x71X02pA";
    }
    axios
      .post(url, authData)
      .then(respose => {
        console.log(respose);
        const expirationDate = new Date(
          new Date().getTime() + respose.data.expiresIn * 1000
        );
        localStorage.setItem("token", respose.data.idToken);
        localStorage.setItem("expirationTime", expirationDate);
        localStorage.setItem("userId", respose.data.localId);
        dispatch(authSuccess(respose.data.idToken, respose.data.localId));
        dispatch(checkAuthTimeout(respose.data.expiresIn));
      })
      .catch(error => {
        //console.log(JSON.stringify(error.response.data.error.message));
        dispatch(authFail(error.response.data.error.message));
      });
  };
};

export const setAuthRedirect = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT,
    path: path
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationTime = new Date(localStorage.getItem("expirationTime"));
      const userId = localStorage.getItem("userId");
      if (expirationTime > new Date()) {
        dispatch(authSuccess(token, userId));
        dispatch(
          checkAuthTimeout(
            (expirationTime.getTime() - new Date().getTime()) / 1000
          )
        );
      } else {
        dispatch(logout());
      }
    }
  };
};
