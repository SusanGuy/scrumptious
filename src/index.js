import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import modalReducer from "./store/reducers/recipeModal";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";

const rootReducer = combineReducers({
  modal: modalReducer
});
const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
