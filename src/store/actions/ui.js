import * as actionTypes from "./actionTypes";
export const showPasswordModal = () => {
  return {
    type: actionTypes.SHOW_PASSWORD_MODAL,
  };
};

export const hidePasswordModal = () => {
  return {
    type: actionTypes.HIDE_PASSWORD_MODAL,
  };
};
