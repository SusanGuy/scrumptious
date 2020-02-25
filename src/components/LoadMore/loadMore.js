import React from "react";
import "./loadMore.css";
const loadMore = ({ clicked }) => {
  return <span onClick={clicked} className="load-more"></span>;
};

export default loadMore;
