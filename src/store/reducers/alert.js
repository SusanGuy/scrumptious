import * as actionTypes from "../actions/actionTypes";
const initialState = {
  message: "",
  alertType: "",
  hidden: true
};

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ALERT:
      return {
        hidden: false,
        ...action.payload
      };
    case actionTypes.REMOVE_ALERT:
      return initialState;

    default:
      return state;
  }
};

export default alertReducer;
