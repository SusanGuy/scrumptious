import React, { useState, useRef, useEffect, useCallback } from "react";
import "./basic.css";
const Basic = ({ textarea, changed, label, ...rest }) => {
  const [classes, setClasses] = useState({
    labelClasses: ["control-label"],
    barClasses: ["bar"],
  });

  const { labelClasses, barClasses } = classes;
  const value = rest.value;

  const handleClick = useCallback(
    (e) => {
      if (node.current.contains(e.target)) {
        return;
      }
      labelClasses.includes("label-change") && value === ""
        ? setClasses({
            labelClasses: ["control-label"],
            barClasses: ["bar"],
          })
        : setClasses({
            labelClasses: [...labelClasses],
            barClasses: ["bar"],
          });
    },
    [labelClasses, value]
  );

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [handleClick]);
  const node = useRef();

  return (
    <div className="edit-form-group">
      {textarea ? (
        <textarea
          ref={node}
          onClick={() =>
            !labelClasses.includes("label-change") &&
            !barClasses.includes("bar-change") &&
            setClasses({
              labelClasses: [...labelClasses, "label-change"],
              barClasses: [...barClasses, "bar-change"],
            })
          }
          onChange={(e) => {
            changed(e);
          }}
          id={label}
          {...rest}
        />
      ) : (
        <input
          ref={node}
          onClick={() =>
            !labelClasses.includes("label-change") &&
            !barClasses.includes("bar-change") &&
            setClasses({
              labelClasses: [...labelClasses, "label-change"],
              barClasses: [...barClasses, "bar-change"],
            })
          }
          onChange={(e) => {
            changed(e);
          }}
          id={label}
          {...rest}
        />
      )}
      <label className={labelClasses.join(" ")} htmlFor={label}>
        <span>{label}</span>
      </label>
      <i className={barClasses.join(" ")}></i>
    </div>
  );
};

export default Basic;
