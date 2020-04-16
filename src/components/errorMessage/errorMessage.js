import React from "react";
import "./errorMessage.css";
const errorMessage = ({ children }) => {
  return <div className="err">{children}</div>;
};

export default errorMessage;
