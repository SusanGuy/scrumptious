import React from "react";
import "./FilterModal.css";
import FilterList from "../FiltersList/FiltersList";
import { connect } from "react-redux";
import FilterContainer from "../FilterContainer/FilterContainer";
import { setActiveFilter } from "../../store/actions/filter";
const FilterModal = ({
  activeFilter: { name },
  setActiveFilter,
  cost,
  time
}) => {
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
                    cost={cost}
                    time={time}
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
    activeFilter: state.filter.activeFilter,
    cost: state.filter.cost === 0,
    time: state.filter.time === 0
  };
};

export default connect(mapStateToProps, { setActiveFilter })(FilterModal);
