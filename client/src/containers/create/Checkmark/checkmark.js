import React, { useState, useEffect } from "react";
import "./checkmark.css";
import { checkInt } from "../../../regex";
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
          return ingra._id === ingredient._id;
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
        <div style={{ display: "flex" }}>
          <span>{label}</span>
          {other && (
            <CustomInput
              value={time === 0 ? "" : time}
              onChange={(e) => {
                console.log(e.target.value);
                if (time !== 0) {
                  setTime(0);
                }

                if (e.target.value === "") {
                  setTime(0);
                } else
                  checkInt(e.target.value)
                    ? setTime(e.target.value)
                    : setTime(time);
              }}
            />
          )}
        </div>
      </label>
    </div>
  );
};

export default Checkmark;
