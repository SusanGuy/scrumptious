import React from "react";
import "./TimeAndCost.css";
const TimeAndCost = ({ value, unit, time, cost, clicked }) => {
  return (
    <div
      onClick={clicked}
      className={`time-cost-box ${time === value ? "box-clicked" : ""} ${
        cost === unit ? "box-clicked" : ""
      }`}
    >
      <span>{value} </span>
      <span>{unit}</span>
    </div>
  );
};

export default TimeAndCost;
