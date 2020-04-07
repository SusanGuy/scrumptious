import React from "react";
import NavigationItem from "./navigationItem/navigationItem";
import DropDownMenu from "../../dropdown-menu/DropDownMenu";
const navigationItems = ({ isAuthenticated }) => {
  return (
    <nav>
      <NavigationItem link="/guide" exact>
        How it Works
      </NavigationItem>
      <NavigationItem link="/about-us" exact>
        About Us
      </NavigationItem>
      {isAuthenticated && <DropDownMenu />}
    </nav>
  );
};

export default navigationItems;
