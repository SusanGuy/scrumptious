import * as actionTypes from "./actionTypes";
import axios from "../../axios";
import { createAlert } from "./alert";
import { hideModal } from "../../store/actions/recipeModal";
import { hidePasswordModal } from "./ui";
import { setAuthToken } from "../../utils";
import { resetFilters } from "./filter";
const userLoaded = (token, user) => {
  return {
    type: actionTypes.USER_LOADED,
    payload: { token, user },
  };
};

export const changePassword = (oldPassword, new_password, confirm_password) => {
  return async (dispatch) => {
    if (oldPassword !== "") {
      if (new_password !== "" && confirm_password === "") {
        return dispatch(
          authFail({
            confirmError: "Please enter the password again",
          })
        );
      }
      console.log(new_password, confirm_password);
      if (new_password !== confirm_password) {
        return dispatch(
          authFail({
            authError: "Passwords donot match",
          })
        );
      }
    }
    try {
      dispatch(authStart());
      const submitForm = { password: oldPassword, new_password };
      await axios.patch("/users/me/changePassword", submitForm);
      dispatch(signout());
      dispatch(hidePasswordModal());
      dispatch(
        createAlert("Password changed succesfully! Login again", "success")
      );
    } catch (err) {
      dispatch(authFail(err.response ? err.response.data : err.message));
    }
  };
};

export const deleteImage = () => {
  return async (dispatch) => {
    try {
      dispatch(authStart());
      await axios.delete("/users/me/avatar");
      dispatch(createAlert("Profile picture removed succesfully", "success"));
      dispatch(loadUser());
    } catch (err) {
      dispatch(authFail(err.response ? err.response.data : err.message));
    }
  };
};

export const updateForm = (email) => {
  return async (dispatch) => {
    try {
      dispatch(authStart());

      const submitForm = { email };

      await axios.patch("/users/me", submitForm);
      dispatch(createAlert("Your profile has been updated!", "success"));
      dispatch(loadUser());
    } catch (err) {
      dispatch(authFail(err.response ? err.response.data : err.message));
    }
  };
};

export const uploadImage = (image) => {
  return async (dispatch) => {
    try {
      dispatch(authStart());
      const fd = new FormData();
      fd.append("upload", image, image.name);
      await axios.post("/users/me/avatar", fd);
      dispatch(loadUser());
      dispatch(createAlert("Profile picture updated succesfully", "success"));
    } catch (err) {
      dispatch(authFail(err.response ? err.response.data : err.message));
    }
  };
};

export const clearErrors = () => {
  return { type: actionTypes.CLEAR_ERRORS };
};

export const login = (email, password, history) => {
  return async (dispatch) => {
    try {
      dispatch(authStart());
      const submitForm = { email, password };
      const {
        data: { token },
      } = await axios.post("/users/login", submitForm);
      dispatch(authSuccess(token));
      dispatch(loadUser());
      dispatch(resetFilters());
      dispatch(hideModal());
      history.push("/my-recipes");
    } catch (err) {
      dispatch(
        createAlert(
          err.response ? err.response.data.authError : err.message,
          "failure"
        )
      );
      dispatch(authFail(err.response ? err.response.data : err.message));
    }
  };
};

export const signup = (name, email, password, history) => {
  return async (dispatch) => {
    try {
      dispatch(authStart());
      const submitForm = { name, email, password };
      const {
        data: { token },
      } = await axios.post("/users", submitForm);
      dispatch(authSuccess(token));
      dispatch(loadUser());
      dispatch(resetFilters());
      dispatch(hideModal());
      history.push("/my-recipes");
    } catch (err) {
      dispatch(
        createAlert(
          err.response ? err.response.data.authError : err.message,
          "failure"
        )
      );
      dispatch(authFail(err.response ? err.response.data : err.message));
    }
  };
};

export const loadUser = () => {
  return async (dispatch) => {
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
    type: actionTypes.AUTH_START,
  };
};

const authSuccess = (token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: { token },
  };
};
const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    payload: error,
  };
};

export const signout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};
