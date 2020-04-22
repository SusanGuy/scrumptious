import React, { useState, useEffect } from "react";
import "./checkmark.css";
import CustomInput from "../../../components/CustomInput/CustomInput";
const Checkmark = ({
  label,
  ingredient,
  ingredients,
  allergy,
  other,
  setTime,
  changed,
  time,
  ...rest
}) => {
  const [classes, setClasses] = useState(["tickmark"]);

  useEffect(() => {
    if (time === undefined && ingredient === undefined) {
      if (allergy) {
        setChecked(true);
        setClasses(["tickmark", "tickmark-clicked"]);
      } else {
        setChecked(false);
        setClasses(["tickmark"]);
      }
    } else if (ingredient) {
      if (
        ingredients.find((ingra) => {
          return ingra.ingredient === ingredient.ingredient;
        })
      ) {
        setChecked(true);
        setClasses(["tickmark", "tickmark-clicked"]);
      } else {
        setChecked(false);
        setClasses(["tickmark"]);
      }
    } else {
      if (time.toString() === rest.value) {
        setChecked(true);
        setClasses(["tickmark", "tickmark-clicked"]);
      } else {
        setChecked(false);
        setClasses(["tickmark"]);
      }
    }
  }, [allergy, time, rest.value, ingredient, ingredients]);

  const [checked, setChecked] = useState(false);

  return (
    <div className="edit-form-group">
      <input
        onChange={(e) => {
          if (ingredient) {
            changed(e, ingredient);
          } else {
            !other && changed(e);
          }
        }}
        className="nutrition-checkbox"
        id={label}
        {...rest}
        type="checkbox"
        checked={checked}
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
      </label>
    </div>
  );
};

export default Checkmark;
