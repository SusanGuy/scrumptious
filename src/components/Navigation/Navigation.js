import React from "react";
import { connect } from "react-redux";
import NavigationItems from "./navigationItems/navigationItems";
import { Link, withRouter } from "react-router-dom";
import AuthButton from "../authButton/authButton";
import "./Navigation.css";
import Aux from "../../hoc/Aux";
import "./Navigation.css";
const Navigation = ({ history, isAuthenticated }) => {
  return (
    <Aux>
      <header className="main-header">
        <h1 onClick={() => history.push("/")} className="logo">
          scrumptious<span></span>
        </h1>
        <NavigationItems isAuthenticated={isAuthenticated} />
        {!isAuthenticated ? (
          <Link to="/auth">
            <AuthButton>Sign In</AuthButton>
          </Link>
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
  };
};

export default connect(mapStateToProps)(withRouter(Navigation));
