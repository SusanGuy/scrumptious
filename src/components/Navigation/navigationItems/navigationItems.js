import React from "react";
import NavigationItem from "./navigationItem/navigationItem";
import DropDownMenu from "../../dropdown-menu/DropDownMenu";
const navigationItems = ({ isAuthenticated }) => {
  return (
    <nav>
      <NavigationItem link="/new" exact>
        Create a Recipe
      </NavigationItem>

      {isAuthenticated && <DropDownMenu />}
    </nav>
  );
};

export default navigationItems;
