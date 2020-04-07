import React from "react";
import Spinner from "../../../Spinner/Spinner";
import "./dropdown.css";
const dropdown = ({ ingredients, loading }) => {
  let mama;
  if (loading) {
    mama = <Spinner width="4em" height="4em" />;
  } else if (ingredients.length === 0) {
    mama = <p>No any ingredients found</p>;
  } else {
    mama = ingredients.map(({ _id, name }) => (
      <div key={_id} className="inner-suggestion">
        <div className="checkbox-group">{name}</div>
      </div>
    ));
  }
  return <div className="suggestion-container">{mama}</div>;
};

export default dropdown;
