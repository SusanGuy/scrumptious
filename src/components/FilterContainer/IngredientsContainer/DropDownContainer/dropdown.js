import React from "react";
import Spinner from "../../../Spinner/Spinner";
import "./dropdown.css";
const Dropdown = ({ ingredients, loading }) => {
  let mama;
  if (loading) {
    mama = <Spinner width="4em" height="4em" />;
  } else if (ingredients.length === 0) {
    mama = (
      <p
        style={{
          padding: "20px 0",
          fontSize: "18px",
        }}
      >
        No any ingredients found!
      </p>
    );
  } else {
    mama = ingredients.map(({ _id, name }) => (
      <div key={_id} className="checkbox-group">
        {name}
      </div>
    ));
  }
  return (
    <div className="suggestion-container">
      <div className="inner-suggestion">{mama} </div>
    </div>
  );
};

export default Dropdown;
