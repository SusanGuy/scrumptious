import React from "react";
import "./loadMore.css";
const loadMore = ({ clicked }) => {
  return (
    <div onClick={clicked} className="arrow bounce">
      <i className="fa fa-arrow-down fa-2x"></i>
    </div>
  );
};

export default loadMore;
