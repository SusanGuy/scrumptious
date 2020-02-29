import React from "react";
import "./FilterModal.css";
import FilterList from "../FiltersList/FiltersList";
import { connect } from "react-redux";
import FilterContainer from "../FilterContainer/FilterContainer";
import { setActiveFilter } from "../../store/actions/filterModal";
const FilterModal = ({ activeFilter: { name }, setActiveFilter }) => {
  const filters = ["Ingredients", "Cost", "Time", "Allergies", "Nutrition"];

  return (
    <div className="filters-wrapper">
      <section className="filters-everything">
        <div className="filter-container">
          <div className="filter-categories">
            <ul className="categories-list">
              {filters.map(filter => {
                return (
                  <FilterList
                    activeFilter={name}
                    clicked={() => setActiveFilter(filter)}
                    key={filter}
                  >
                    {filter}
                  </FilterList>
                );
              })}
            </ul>
          </div>
          <FilterContainer name={name} />
        </div>
      </section>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    activeFilter: state.filterContainer.activeFilter
  };
};

export default connect(mapStateToProps, { setActiveFilter })(FilterModal);
