import React from "react";
import "./FilterModal.css";
const FilterModal = () => {
  return (
    <div className="filters-wrapper">
      <section className="filters-everything">
        <div className="filter-container">
          <div className="filter-categories">
            <ul className="categories-list">
              <li className="filter-category ingredients-category active">
                <h3 className="filter-title">Ingredients</h3>
              </li>
              <li className="filter-category tastes-category">
                <h3 className="filter-title">Tastes</h3>
              </li>
              <li className="filter-category diets-category">
                <h3 className="filter-title">Diets</h3>
              </li>
              <li className="filter-category allergies-category">
                <h3 className="filter-title">Allergies</h3>
              </li>
              <li className="filter-category nutrition-category">
                <h3 className="filter-title">Nutrition</h3>
              </li>
              <li className="filter-category techniques-category">
                <h3 className="filter-title">Techniques</h3>
              </li>
            </ul>
          </div>
          <div className="filter-group-wrapper">
            <div className="filter-group">
              <div className="filter-wrapper">
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FilterModal;
