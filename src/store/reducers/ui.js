import * as actionTypes from "../actions/actionTypes";

const initialState = {
  hidden: false
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_PASSWORD_MODAL:
      return {
        hidden: true
      };

    case actionTypes.HIDE_PASSWORD_MODAL:
      return {
        hidden: false
      };

    default:
      return state;
  }
};

export default uiReducer;
