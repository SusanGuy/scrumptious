import React, { useState, useRef, useEffect, useCallback } from "react";
import "./basic.css";
const Basic = ({ textarea, changed, label, id, ...rest }) => {
  const [classes, setClasses] = useState({
    barClasses: ["bar"],
  });

  const { barClasses } = classes;
  const value = rest.value;

  const handleClick = useCallback(
    (e) => {
      if (node.current.contains(e.target)) {
        return;
      }
      value === ""
        ? setClasses({
            barClasses: ["bar"],
          })
        : setClasses({
            barClasses: ["bar"],
          });
    },
    [value]
  );

  const node = useRef();

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [handleClick]);

  return (
    <div className="edit-form-group">
      {textarea ? (
        <textarea
          ref={node}
          onClick={() =>
            !barClasses.includes("bar-change") &&
            setClasses({
              barClasses: [...barClasses, "bar-change"],
            })
          }
          onChange={(e) => {
            changed(e);
          }}
          id={label}
          {...rest}
          className="basic-info-input basic-textarea"
        />
      ) : (
        <input
          ref={node}
          onClick={() =>
            !barClasses.includes("bar-change") &&
            setClasses({
              barClasses: [...barClasses, "bar-change"],
            })
          }
          onChange={(e) => {
            changed(e);
          }}
          id={label}
          className="basic-info-input"
          {...rest}
        />
      )}
      <label className="control-label" htmlFor={label}>
        <span>{label}</span>
      </label>
      <i className={barClasses.join(" ")}></i>
    </div>
  );
};

export default Basic;
