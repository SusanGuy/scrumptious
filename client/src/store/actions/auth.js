import * as actionTypes from "./actionTypes";
import axios from "../../axios";
import { createAlert } from "./alert";
import { hideModal } from "../../store/actions/recipeModal";
import { clearUser } from "./user";
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
      dispatch(
        createAlert("Password changed succesfully! Login again", "success")
      );
    } catch (err) {
      dispatch(authFail(err.response ? err.response.data : err.message));
    }
  };
};

export const deleteAccount = () => {
  return async (dispatch) => {
    try {
      dispatch(authStart());

      await axios.delete("/users/me");
      dispatch(signout());
      dispatch(createAlert("User deleted Succesfully!", "success"));
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

export const updateForm = (submitForm) => {
  return async (dispatch) => {
    try {
      dispatch(authStart());

      await axios.patch("/users/me", submitForm);
      dispatch(loadUser());
      dispatch(createAlert("Your profile has been updated!", "success"));
    } catch (err) {
      dispatch(createAlert(err.response.data.authError, "failure"));
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

export const login = (
  email,
  password,
  history,
  admin = false,
  hideAdminModal = undefined
) => {
  return async (dispatch) => {
    try {
      dispatch(authStart());
      const submitForm = { email, password };
      const {
        data: { isAdmin, token },
      } = await axios.post("/users/login", submitForm);

      if (admin && !isAdmin) {
        dispatch(authFail({ authError: "Login for Admin only!" }));
      } else if (!admin && isAdmin) {
        dispatch(createAlert("Login for general users only!", "failure"));
        dispatch(authFail({ authError: "Login for general users only!" }));
      } else {
        dispatch(authSuccess(token));
        dispatch(loadUser());
        dispatch(resetFilters());
        dispatch(hideModal());
        history.push(`${isAdmin ? "/users" : "/my-recipes"}`);
        isAdmin && hideAdminModal();
      }
    } catch (err) {
      !admin &&
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

const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const signout = () => {
  return (dispatch) => {
    dispatch(logout());
    dispatch(clearUser());
    dispatch(resetFilters());
  };
};
