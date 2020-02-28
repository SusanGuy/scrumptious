import * as actionTypes from "./actionTypes";
export const showFilterModal = () => {
  return {
    type: actionTypes.SHOW_FILTER_MODAL
  };
};

export const hideFilterModal = () => {
  return {
    type: actionTypes.HIDE_FILTER_MODAL
  };
};

export const setActiveFilter = name => {
  return {
    type: actionTypes.SET_ACTIVE_FILTER,
    payload: name
  };
};
