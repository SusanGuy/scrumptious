import React, { useEffect } from "react";
import Aux from "./hoc/Aux";
import { Switch, Route } from "react-router-dom";
import Auth from "./containers/Auth/auth";
import Landing from "../src/containers/Landing/landing";
import { loadUser } from "./store/actions/auth";
import { connect } from "react-redux";
import Logout from "./components/logout/logout";
import "./App.css";
import { setAuthToken } from "./utils";
import PrivateRoute from "./components/routing/privateRoute";
import Navigation from "./components/Navigation/Navigation";
import UserRecipes from "./containers/Recipes/recipes";
if (localStorage.token) {
  setAuthToken(localStorage.token);
}
function App({ loadUser }) {
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <Aux>
      <Navigation />
      <Switch>
        <PrivateRoute exact path="/my-recipes" component={UserRecipes} />
        <PrivateRoute exact path="/logout" component={Logout} />
        <Route path="/auth" component={Auth} />
        <Route to="/" exact component={Landing} />
      </Switch>
    </Aux>
  );
}

export default connect(null, { loadUser })(App);
