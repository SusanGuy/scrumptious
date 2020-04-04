import * as actionTypes from "./actionTypes";
import axios from "../../axios";
import { setAuthToken } from "../../utils";
const userLoaded = (token, user) => {
  return {
    type: actionTypes.USER_LOADED,
    payload: { token, user }
  };
};

export const clearErrors = () => {
  return { type: actionTypes.CLEAR_ERRORS };
};

export const login = (email, password, history) => {
  return async dispatch => {
    try {
      dispatch(authStart());
      const submitForm = { email, password };
      const {
        data: { token }
      } = await axios.post("/users/login", submitForm);
      dispatch(authSuccess(token));
      dispatch(loadUser());
      history.push("/my-recipes");
    } catch (err) {
      dispatch(authFail(err.response ? err.response.data : err.message));
    }
  };
};

export const signup = (name, email, password, history) => {
  return async dispatch => {
    try {
      dispatch(authStart());
      const submitForm = { name, email, password };
      const {
        data: { token }
      } = await axios.post("/users", submitForm);
      dispatch(authSuccess(token));
      dispatch(loadUser());
      history.push("/my-recipes");
    } catch (err) {
      dispatch(authFail(err.response ? err.response.data : err.message));
    }
  };
};

export const loadUser = () => {
  return async dispatch => {
    try {
      setAuthToken(localStorage.token);
      const { data } = await axios.get("/users/me");
      dispatch(userLoaded(localStorage.token, data));
    } catch (err) {
      dispatch(authFail(err.response ? err.response.data : err.message));
    }
  };
};

const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

const authSuccess = token => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: { token }
  };
};
const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    payload: error
  };
};

export const signout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};
