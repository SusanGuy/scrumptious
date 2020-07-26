import React from "react";
import "./StarRating.css";
const StarRating = ({ feedbacks }) => {
  const averageRating = Math.ceil(
    feedbacks.reduce(
      (accumulator, currentValue) => accumulator + currentValue.rating,
      0
    ) / feedbacks.length
  );

  return (
    <fieldset className="rating-disabled">
      <input
        id="star5"
        type="radio"
        name="rating2"
        value="5"
        disabled="disabled"
        defaultChecked={averageRating === 5}
      />
      <label htmlFor="star5">
        <i className="fas fa-star"></i>
      </label>
      <input
        id="star4"
        type="radio"
        name="rating2"
        value="4"
        disabled="disabled"
        defaultChecked={averageRating === 4}
      />
      <label htmlFor="star4">
        <i className="fas fa-star"></i>
      </label>
      <input
        id="star3"
        type="radio"
        name="rating2"
        value="3"
        disabled="disabled"
        defaultChecked={averageRating === 3}
      />
      <label htmlFor="star3">
        <i className="fas fa-star"></i>
      </label>
      <input
        id="star2"
        type="radio"
        name="rating2"
        value="2"
        disabled="disabled"
        defaultChecked={averageRating === 2}
      />
      <label htmlFor="star2">
        <i className="fas fa-star"></i>
      </label>
      <input
        id="star1"
        type="radio"
        name="rating2"
        value="1"
        defaultChecked={averageRating === 1}
      />
      <label htmlFor="star1">
        <i className="fas fa-star"></i>
      </label>
    </fieldset>
  );
};

export default StarRating;
