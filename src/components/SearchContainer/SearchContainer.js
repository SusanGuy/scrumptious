import React from "react";
import "./searchcontainer.css";
import SearchBar from "./SearchBar/SearchBar";
import { connect } from "react-redux";
import {
  hideFilterModal,
  showFilterModal,
  resetFilters
} from "../../store/actions/filter";
import FilterModal from "../FilterModal/FilterModal";

const SearchContainer = ({
  hidden,
  showFilterModal,
  hideFilterModal,
  resetFilters
}) => {
  return (
    <div className="cookbook-search-results">
      <div className="search-tools">
        <div className="search-tools-meta ">
          <SearchBar />
          <div className="filter-sort-organization">
            <div
              onClick={() => (!hidden ? showFilterModal() : hideFilterModal())}
              className="toggle-filters"
            >
              <span className="filter-sliders"></span>
              <i
                style={{
                  color: hidden ? "#659dbd" : ""
                }}
                className="fas fa-sliders-h"
              ></i>
              <span className="filters-title">Filter</span>
            </div>
            <div
              onClick={() => resetFilters()}
              className="guided-search-breadcrumbs"
            >
              <span className="reset">Reset</span>
              <div className="guided-search-breadcrumbs-list"></div>
            </div>
          </div>
          {hidden && <FilterModal />}
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    hidden: state.filter.hidden
  };
};

export default connect(mapStateToProps, {
  showFilterModal,
  hideFilterModal,
  resetFilters
})(SearchContainer);
