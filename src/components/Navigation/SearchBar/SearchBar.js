import React from "react";
import "./SearchBar.css";
const SearchBar = () => {
  return (
    <div className="wrap">
      <form>
        <div className="search">
          <input
            value=""
            type="text"
            className="searchTerm"
            placeholder="Enter ingredient name"
          />
          <button type="submit" className="searchButton">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
