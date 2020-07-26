import * as actionTypes from "../actions/actionTypes";

export const createAlert = (message, alertType) => {
  return {
    type: actionTypes.SET_ALERT,
    payload: { message, alertType },
  };
};

export const removeAlert = () => {
  return {
    type: actionTypes.REMOVE_ALERT,
  };
};
