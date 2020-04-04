import React from "react";

import NavigationItems from "./navigationItems/navigationItems";
import { Link } from "react-router-dom";
import AuthButton from "../authButton/authButton";
import "./Navigation.css";
import Aux from "../../hoc/Aux";
import "./Navigation.css";
const Navigation = () => {
  return (
    <Aux>
      <header className="main-header">
        <h1 className="logo">
          scrumptious<span></span>
        </h1>
        <NavigationItems />
        <Link to="/auth">
          <AuthButton>Sign In</AuthButton>
        </Link>
      </header>
    </Aux>
  );
};

export default Navigation;
