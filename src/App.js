import React, { useEffect } from "react";
import Aux from "./hoc/Aux";
import { Switch, Route } from "react-router-dom";
import Auth from "./containers/Auth/auth";
import Landing from "../src/containers/Landing/landing";
import Fridge from "../src/containers/Fridge/fridge";
import Favorites from "./containers/Favorites/favorites";
import { loadUser } from "./store/actions/auth";
import { connect } from "react-redux";
import Logout from "./components/logout/logout";
import "./App.css";
import Alert from "./components/alert/alert";
import { setAuthToken } from "./utils";
import PrivateRoute from "./components/routing/privateRoute";
import Navigation from "./components/Navigation/Navigation";
import UserRecipes from "./containers/Recipes/recipes";
if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = ({ loadUser, message, type, hidden }) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <Aux>
      <Navigation />
      {!hidden && <Alert message={message} type={type} />}
      <Switch>
        <PrivateRoute exact path="/my-fridge" component={Fridge} />
        <PrivateRoute exact path="/favorites" component={Favorites} />
        <PrivateRoute exact path="/my-recipes" component={UserRecipes} />
        <PrivateRoute exact path="/logout" component={Logout} />
        <Route path="/auth" component={Auth} />
        <Route to="/" exact component={Landing} />
      </Switch>
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    message: state.alert.message,
    type: state.alert.alertType,
    hidden: state.alert.hidden,
  };
};

export default connect(mapStateToProps, { loadUser })(App);
