import React, { useState, useEffect } from "react";
import Aux from "./hoc/Aux";
import Footer from "./components/footer/footer";
import { Switch, Route } from "react-router-dom";
import Auth from "./containers/Auth/auth";
import Landing from "../src/containers/Landing/landing";
import Fridge from "../src/containers/Fridge/fridge";
import Favorites from "./containers/Favorites/favorites";
import ProfileCard from "./containers/Profile-Card/ProfileCard";
import { loadUser } from "./store/actions/auth";
import CreateRecipe from "./containers/create/create";
import { connect } from "react-redux";
import Logout from "./components/logout/logout";
import "./App.css";
import Alert from "./components/alert/alert";
import AccountSetttings from "./containers/account/account";
import { setAuthToken } from "./utils";
import PrivateRoute from "./components/routing/userRoute";
import Navigation from "./components/Navigation/Navigation";
import UserRecipes from "./containers/Recipes/recipes";
import NotFound from "./components/404/NotFound";
import AdminLogin from "./components/adminLogin/adminLogin";
import Users from "./containers/users/Users";
import UsersRecipes from "./containers/userRecipes/UserRecipes";
if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = ({ loadUser, message, type, hidden, user }) => {
  const [adminHidden, setAdminHidden] = useState(true);
  const showAdminModal = () => setAdminHidden(false);
  const hideAdminModal = () => setAdminHidden(true);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <Aux>
      <Navigation showAdminModal={showAdminModal} />
      {!user && !adminHidden && (
        <AdminLogin hidden={adminHidden} hideAdminModal={hideAdminModal} />
      )}
      <div className="page-container">
        <div className="content-wrap">
          {!hidden && <Alert message={message} type={type} />}

          <Switch>
            <PrivateRoute exact path="/users" component={Users} />
            <PrivateRoute
              exact
              path="/users/recipes/:id"
              component={UsersRecipes}
            />
            <PrivateRoute exact path="/new" component={CreateRecipe} />
            <PrivateRoute exact path="/recipes/:id" component={CreateRecipe} />
            <PrivateRoute exact path="/my-profile" component={ProfileCard} />
            <PrivateRoute
              exact
              path="/account-settings"
              component={AccountSetttings}
            />
            <PrivateRoute exact path="/my-fridge" component={Fridge} />
            <PrivateRoute exact path="/my-favorites" component={Favorites} />
            <PrivateRoute exact path="/my-recipes" component={UserRecipes} />
            <PrivateRoute exact path="/logout" component={Logout} />
            <Route path="/auth" exact component={Auth} />
            <Route path="/" exact component={Landing} />
            <Route component={NotFound} />
          </Switch>
        </div>
        <Footer />
      </div>
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
