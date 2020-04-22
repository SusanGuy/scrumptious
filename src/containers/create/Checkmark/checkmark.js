import React, { useState, useEffect } from "react";
import "./checkmark.css";
import CustomInput from "../../../components/CustomInput/CustomInput";
const Checkmark = ({
  label,
  ingro,
  allergy,
  other,
  setTime,
  changed,
  time,
  ...rest
}) => {
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
          if (time && !e.target.checked && time.toString() !== e.target.value) {
            e.target.checked = !e.target.checked;
          }
          !other && changed(e);
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
        {other && (
          <CustomInput
            onChange={(e) => {
              if (time !== 0) {
                setTime(0);
              }
              setTime(e.target.value === "" ? 0 : e.target.value);
            }}
          />
        )}
        {ingro && (
          <CustomInput
            placeholder="Search for the ingredients in your fridge"
            ingro
          />
        )}
      </label>
    </div>
  );
};

export default Checkmark;
