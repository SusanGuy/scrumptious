import React from "react";
import "./FiltersList.css";
import FilterCount from "./FilterCount/FilterCount";
const FiltersList = ({
  children,
  time,
  cost,
  allergies,
  clicked,
  activeFilter,
  nutritions
}) => {
  let filterList = null;
  if (time && children === "Time") {
    filterList = <FilterCount value="1" />;
  }
  if (cost && children === "Cost") {
    filterList = <FilterCount value="1" />;
  }
  if (allergies.length !== 0 && children === "Allergies") {
    filterList = <FilterCount value={allergies.length} />;
  }

  if (nutritions.length !== 0 && children === "Nutrition") {
    filterList = <FilterCount value={nutritions.length} />;
  }
  return (
    <li
      onClick={clicked}
      className={`filter-category ${activeFilter === children ? "active" : ""}`}
    >
      <h3 className="filter-title">
        {children}
        {filterList}
      </h3>
    </li>
  );
};

export default FiltersList;
