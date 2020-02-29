import React from "react";
import "./TimeAndCost.css";
const TimeAndCost = ({ value, unit }) => {
  return (
    <div class="time-cost-box">
      <span>{value} </span>
      <span>{unit}</span>
    </div>
  );
};

export default TimeAndCost;
