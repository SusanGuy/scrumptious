import * as actionTypes from "../actions/actionTypes";

const initialState = {
  filter: false,
  recipeFilter: "",
  time: 0,
  cost: 0,
  withIngredients: [],
  withoutIngredients: [],
  allergies: [],
  nutritions: [],
  hidden: false,
  activeFilter: {
    active: false,
    name: "",
  },
};

const filterReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.SHOW_FILTER_MODAL:
      return {
        ...state,
        hidden: true,
      };
    case actionTypes.HIDE_FILTER_MODAL:
      return {
        ...state,
        activeFilter: { active: false, name: "" },
        hidden: false,
      };

    case actionTypes.SET_ACTIVE_FILTER:
      if (payload === state.activeFilter.name) {
        return {
          ...state,
          activeFilter: { active: false, name: "" },
        };
      }
      return {
        ...state,
        activeFilter: {
          active: true,
          name: payload,
        },
      };

    case actionTypes.SEARCH_BY_RECIPE_NAME:
      if (payload === "") {
        return {
          ...state,
          filter: false,
          recipeFilter: "",
        };
      }
      return {
        ...state,
        filter: true,
        recipeFilter: payload,
      };

    case actionTypes.SEARCH_BY_COST:
      if (payload === state.cost) {
        return {
          ...state,
          cost: 0,
        };
      }
      return {
        ...state,

        cost: payload,
      };
    case actionTypes.SEARCH_BY_TIME:
      if (payload === state.time) {
        return {
          ...state,
          time: 0,
        };
      }
      return {
        ...state,

        time: payload,
      };

    case actionTypes.SEARCH_BY_ALLERGY:
      if (state.allergies.includes(payload)) {
        return {
          ...state,
          allergies: state.allergies.filter((allergy) => allergy !== payload),
        };
      }
      return {
        ...state,
        allergies: state.allergies.concat(payload),
      };

    case actionTypes.ADD_FILTER_INGREDIENT:
      if (payload.type === "withIngredient") {
        return !state.withIngredients.includes(payload.ingredient) &&
          !state.withoutIngredients.find(
            (ingredient) => ingredient.name === payload.ingredient.name
          )
          ? {
              ...state,
              withIngredients: state.withIngredients.concat(payload.ingredient),
            }
          : state;
      } else {
        return !state.withoutIngredients.includes(payload.ingredient) &&
          !state.withIngredients.find(
            (ingredient) => ingredient.name === payload.ingredient.name
          )
          ? {
              ...state,
              withoutIngredients: state.withoutIngredients.concat(
                payload.ingredient
              ),
            }
          : state;
      }

    case actionTypes.REMOVE_FILTER_INGREDIENT:
      if (payload.type === "withIngredient") {
        return {
          ...state,
          withIngredients: state.withIngredients.filter(
            (ingredient) => ingredient !== payload.ingredient
          ),
        };
      } else {
        return {
          ...state,
          withoutIngredients: state.withoutIngredients.filter(
            (ingredient) => ingredient !== payload.ingredient
          ),
        };
      }

    case actionTypes.SEARCH_BY_NUTRITION:
      if (
        state.nutritions.length > 0 &&
        state.nutritions.find(
          ({ name, type }) => name === payload.name && type === payload.type
        )
      ) {
        return {
          ...state,
          nutritions: state.nutritions.filter(
            (nutrition) => nutrition.name !== payload.name
          ),
        };
      } else if (
        state.nutritions.length > 0 &&
        state.nutritions.find(({ name }) => name === payload.name)
      ) {
        state.nutritions = state.nutritions.filter(
          (nutrition) => nutrition.name !== payload.name
        );
      }
      return {
        ...state,
        nutritions: state.nutritions.concat(payload),
      };
    case actionTypes.RESET_FILTERS:
      return {
        ...initialState,
        filter: state.filter,
        recipeFilter: state.recipeFilter,
      };
    default:
      return state;
  }
};
export default filterReducer;
