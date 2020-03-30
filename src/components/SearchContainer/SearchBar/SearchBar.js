import React, { useState, useEffect } from "react";
import "./SearchBar.css";
import { connect } from "react-redux";
import { filterByName } from "../../../store/actions/filter";
const SearchBar = ({ filterByName, filter }) => {
  const [recipeName, setRecipeName] = useState("");
  useEffect(() => {
    if (filter || recipeName !== "") {
      filterByName(recipeName.trim());
    }
  }, [filterByName, filter, recipeName]);
  return (
    <form className="search-section">
      <span className="spyglass">
        <i className="fas fa-search"></i>
      </span>
      <div className="searchbox-container">
        <input
          onChange={e => setRecipeName(e.target.value)}
          type="text"
          className="searchbox-input"
          placeholder="Search recipes"
          value={recipeName}
        />
        <div className="searchbox-suggestion-container"></div>
      </div>
    </form>
  );
};

const mapStateToProps = state => {
  return {
    filter: state.filter.filter
  };
};

export default connect(mapStateToProps, { filterByName })(SearchBar);
