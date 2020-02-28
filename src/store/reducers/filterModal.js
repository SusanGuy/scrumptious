import * as actionTypes from "../actions/actionTypes";

const initialState = {
  hidden: false,
  activeFilter: {
    active: false,
    name: ""
  }
};

const modalReducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case actionTypes.SHOW_FILTER_MODAL:
      return {
        ...state,
        hidden: true
      };

    case actionTypes.HIDE_FILTER_MODAL:
      return {
        ...state,
        activeFilter: { active: false, name: "" },
        hidden: false
      };

    case actionTypes.SET_ACTIVE_FILTER:
      if (payload === state.activeFilter.name) {
        return {
          ...state,
          activeFilter: { active: false, name: "" }
        };
      }
      return {
        ...state,
        activeFilter: {
          active: true,
          name: payload
        }
      };

    default:
      return state;
  }
};

export default modalReducer;
