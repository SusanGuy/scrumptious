import React, { useState, useEffect } from "react";
import "./checkmark.css";
const Checkmark = ({ label, allergy, changed, time, ...rest }) => {
  const [classes, setClasses] = useState(["tickmark"]);

  useEffect(() => {
    if (time === undefined) {
      return allergy
        ? setClasses(["tickmark", "tickmark-clicked"])
        : setClasses(["tickmark"]);
    } else {
      return time.toString() === rest.value
        ? setClasses(["tickmark", "tickmark-clicked"])
        : setClasses(["tickmark"]);
    }
  }, [allergy, time, rest.value]);

  return (
    <div className="edit-form-group">
      <input
        onChange={(e) => {
          changed(e);
        }}
        className="nutrition-checkbox"
        id={label}
        {...rest}
        type="checkbox"
      />
      <span className={classes.join(" ")}>
        {classes.includes("tickmark-clicked") && (
          <span className="tick-me"> &#10003;</span>
        )}
      </span>
      <label className="checkbox-label" htmlFor={label}>
        <span>{label}</span>
      </label>
    </div>
  );
};

export default Checkmark;
