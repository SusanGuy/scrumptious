import React from "react";
import "./FilterCount.css";
const FilterCount = ({ value }) => {
  return (
    <div>
      <span className="filter-count">{value}</span>
    </div>
  );
};

export default FilterCount;
