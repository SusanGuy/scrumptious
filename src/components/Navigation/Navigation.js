import React from "react";
import { connect } from "react-redux";
import NavigationItems from "./navigationItems/navigationItems";
import { Link, withRouter } from "react-router-dom";
import AuthButton from "../authButton/authButton";
import "./Navigation.css";
import Aux from "../../hoc/Aux";
import "./Navigation.css";
const Navigation = ({ history, user, isAuthenticated, showAdminModal }) => {
  return (
    <Aux>
      <header className="main-header">
        <h1 onClick={() => history.push("/")} className="logo">
          scrumptious<span></span>
        </h1>
        <NavigationItems
          isAdmin={user && user.isAdmin}
          isAuthenticated={isAuthenticated}
        />
        {!isAuthenticated ? (
          <Aux>
            <Link to="/auth">
              <AuthButton>Sign In</AuthButton>
            </Link>
            <AuthButton onClick={() => showAdminModal()} admin>
              Admin
            </AuthButton>
          </Aux>
        ) : (
          <Link to="/logout">
            <AuthButton signout>Sign Out</AuthButton>
          </Link>
        )}
      </header>
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(withRouter(Navigation));
