import React from "react";
import "./spinner.css";
const Spinner = props => {
  return (
    <div
      style={{
        ...props
      }}
      className="loader"
    >
      Loading...
    </div>
  );
};
export default Spinner;
