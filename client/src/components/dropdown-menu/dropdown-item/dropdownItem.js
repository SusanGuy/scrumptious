import React from "react";
import { Link } from "react-router-dom";
import "./dropdownItem.css";
const dropdownItem = ({ link, children }) => {
  return (
    <li className="dropdown-item">
      <Link to={link}>{children}</Link>
    </li>
  );
};

export default dropdownItem;
