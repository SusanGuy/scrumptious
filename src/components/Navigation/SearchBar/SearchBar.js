import React, { useState, useEffect } from "react";
import "./SearchBar.css";
import { connect } from "react-redux";
import { filterByName } from "../../../store/actions/filter";
const SearchBar = ({ filterByName }) => {
  const [recipeName, setRecipeName] = useState("");
  useEffect(() => {
    filterByName(recipeName);
  }, [filterByName, recipeName]);
  return (
    <div className="wrap">
      <form>
        <div className="search">
          <input
            onChange={e => setRecipeName(e.target.value)}
            value={recipeName}
            type="text"
            className="searchTerm"
            placeholder="Enter recipe name"
          />
          <button
            onClick={e => {
              e.preventDefault();
            }}
            type="submit"
            className="searchButton"
          >
            <i className="fa fa-search"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default connect(null, { filterByName })(SearchBar);
