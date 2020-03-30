import React from "react";
import NavigationItem from "./navigationItem/navigationItem";

const navigationItems = ({ isAuthenticated }) => {
  return (
    <nav>
      <NavigationItem link="/guide" exact>
        How it Works
      </NavigationItem>
      <NavigationItem link="/about-us" exact>
        About Us
      </NavigationItem>
    </nav>
  );
};

export default navigationItems;
