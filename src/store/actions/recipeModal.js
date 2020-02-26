import * as actionTypes from "./actionTypes";
export const showModal = recipe => {
  return {
    type: actionTypes.SHOW_RECIPE_MODAL,
    payload: recipe
  };
};

export const hideModal = () => {
  return {
    type: actionTypes.HIDE_RECIPE_MODAL
  };
};
