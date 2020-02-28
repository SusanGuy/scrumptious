import React from "react";
import "./FilterModal.css";
import FilterList from "../FiltersList/FiltersList";
import { connect } from "react-redux";
import { setActiveFilter } from "../../store/actions/filterModal";
const FilterModal = ({ activeFilter: { name }, setActiveFilter }) => {
  const filters = ["Ingredients", "Cost", "Time", "Allergies", "Nutrition"];

  let filterRow;

  if (name === "Ingredients") {
    filterRow = (
      <div className="ingredients-row">
        <div className="ingredient-suggest-wrapper">
          <form className="suggest-form">
            <div className="ingredient-suggest-container">
              <input
                type="text"
                className="ingredient-suggest-input p1-text"
                name="IngredientSuggestInput"
                placeholder="With Ingredients"
                value=""
              />
              <div className="suggestion-container"></div>
            </div>
            <span className="spyglass mama"></span>
          </form>
        </div>
        <div className="ingredient-suggest-wrapper">
          <form className="suggest-form">
            <div className="ingredient-suggest-container">
              <input
                type="text"
                className="ingredient-suggest-input p1-text"
                name="IngredientSuggestInput"
                placeholder="Without Ingredients"
                value=""
              />
              <div className="suggestion-container"></div>
            </div>
            <span className="spyglass mama"></span>
          </form>
        </div>
      </div>
    );
  }

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
          <div className="filter-group-wrapper">
            <div className="filter-group">
              <div className="filter-wrapper">{filterRow}</div>
            </div>
          </div>
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
