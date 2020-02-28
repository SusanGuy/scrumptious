import React from "react";
import "./FiltersList.css";
const FiltersList = ({ children, clicked, activeFilter }) => {
  return (
    <li
      onClick={clicked}
      className={`filter-category ${activeFilter === children ? "active" : ""}`}
    >
      <h3 className="filter-title">{children}</h3>
    </li>
  );
};

export default FiltersList;
