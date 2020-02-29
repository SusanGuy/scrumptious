import * as actionTypes from "../actions/actionTypes";
const initialState = {
  filter: false,
  recipeFilter: "",
  recipes: [],
  time: 0,
  cost: 0,
  allergies: [],
  hidden: false,
  activeFilter: {
    active: false,
    name: ""
  }
};

const filterReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
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

    case actionTypes.SEARCH_BY_RECIPE_NAME:
      if (payload === "") {
        return {
          ...state,
          filter: false,
          recipeFilter: ""
        };
      }
      return {
        ...state,
        filter: true,
        recipeFilter: payload
      };

    case actionTypes.SEARCH_BY_COST:
      if (payload === state.cost) {
        return {
          ...state,
          cost: 0
        };
      }
      return {
        ...state,

        cost: payload
      };
    case actionTypes.SEARCH_BY_TIME:
      if (payload === state.time) {
        return {
          ...state,
          time: 0
        };
      }
      return {
        ...state,

        time: payload
      };

    case actionTypes.SEARCH_BY_ALLERGY:
      if (state.allergies.includes(payload)) {
        return {
          ...state,
          allergies: state.allergies.filter(allergy => allergy !== payload)
        };
      }
      return {
        ...state,
        allergies: state.allergies.concat(payload)
      };

    case actionTypes.RESET_FILTERS:
      return initialState;
    default:
      return state;
  }
};
export default filterReducer;
