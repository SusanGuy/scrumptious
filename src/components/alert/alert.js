import React, { useRef, useCallback, useEffect } from "react";
import CloseButton from "../../components/close-button/closeButton";
import { connect } from "react-redux";
import { removeAlert } from "../../store/actions/alert";
import "./alert.css";
const Alert = ({ message, type, removeAlert }) => {
  const node = useRef();

  const handleClick = useCallback(
    e => {
      if (node.current.contains(e.target)) {
        return;
      }
      removeAlert();
    },
    [removeAlert]
  );

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [handleClick]);

  const classes = ["custom-alert"];
  if (type === "success") {
    classes.push("success");
  }
  if (type === "failure") {
    classes.push("failure");
  }

  return (
    <div ref={node} className={classes.join(" ")}>
      <div className="custom-alert-row">
        <div className="custom-alert-column">
          {type === "failure" ? (
            <i
              className="fas fa-exclamation"
              style={{
                color: "#c54646"
              }}
            ></i>
          ) : (
            <i
              className="fas fa-check-circle"
              style={{
                color: "#006600"
              }}
            ></i>
          )}
          {message}
        </div>
        <CloseButton onClick={e => removeAlert()} />
      </div>
    </div>
  );
};

export default connect(null, { removeAlert })(Alert);
