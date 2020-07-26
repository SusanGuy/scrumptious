import React from "react";
import NavigationItem from "./navigationItem/navigationItem";
import DropDownMenu from "../../dropdown-menu/DropDownMenu";
const navigationItems = ({ isAdmin, isAuthenticated }) => {
  return (
    <nav>
      {!isAdmin && (
        <NavigationItem link="/new" exact>
          Create a Recipe
        </NavigationItem>
      )}

      {isAuthenticated && <DropDownMenu />}
    </nav>
  );
};

export default navigationItems;
