import React from "react";
import { Link } from "react-router-dom";
import "./navigationItem.css";
const navigationItem = props => {
  return (
    <li className="nav_link">
      <Link to={props.link}>{props.children}</Link>
    </li>
  );
};

export default navigationItem;
