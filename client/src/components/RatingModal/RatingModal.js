import React, { useState, useRef, useEffect, useCallback } from "react";
import CloseButton from "../close-button/closeButton";
import axios from "axios";
import { createAlert } from "../../store/actions/alert";
import { getFavorites } from "../../store/actions/user";
import CustomButton from "../CustomButton/customButton";
import CustomDeleteButton from "../custom-action-button/actionButton";
import { connect } from "react-redux";
import "./RatingModal.css";
const RatingModal = ({
  hidden,
  setHidden,
  id,
  userId,
  feedbacks,
  getFavorites,
  createAlert,
}) => {
  const node = useRef();
  const handleClick = useCallback(
    (e) => {
      if (node.current.contains(e.target)) {
        return;
      }
      setHidden(true);
    },

    [setHidden]
  );

  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const feedback = feedbacks.find(
      (feedback) => feedback.user.toString() === userId.toString()
    );
    if (feedbacks.length > 0 && userId && feedback && rating === 0) {
      setRating(feedback.rating);
      setMessage("Woah! You've rated this recipe already!");
    }
    if (hidden) {
      document.body.style.overflow = "hidden";
    }
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
      document.body.style.overflow = "unset";
    };
  }, [hidden, handleClick, rating, feedbacks, userId]);

  const handleChange = (e) => {
    setMessage("");
    if (e.target.checked && rating !== parseInt(e.target.value)) {
      setRating(parseInt(e.target.value));
    } else {
      setRating(0);
    }
  };

  const handleRatingRemove = async () => {
    const feedback = feedbacks.find(
      (feedback) => feedback.user.toString() === userId.toString()
    );
    const ratingId = feedback._id;
    try {
      await axios.delete(`/recipes/rate/${id}/${ratingId}`);
      setHidden(true);
      getFavorites();
      createAlert("Rating removed succesfully!", "success");
    } catch (err) {
      createAlert(err.response.data.errMessage, "success");
    }
  };

  return (
    <div className="globalContainer">
      <div ref={node} className="container">
        <div className="exact-button">
          <CloseButton onClick={() => setHidden(true)} />
        </div>
        <h1>Do you like it ?</h1>

        <p>Tell us how do you feel about this recipe?</p>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              await axios.post(`/recipes/rate/${id}`, { rating });
              setHidden(true);
              getFavorites();
              createAlert("Thank you for your rating!", "success");
            } catch (err) {
              createAlert(err.response.data.errMessage, "success");
            }
          }}
        >
          <input
            className="starItem"
            id="star-five"
            value="5"
            type="radio"
            name="star"
            onClick={(e) => {
              if (e.target.checked) {
                setRating(0);
              }
            }}
            onChange={(e) => handleChange(e)}
            checked={rating === 5}
          />
          <label htmlFor="star-five">
            &#9733;<span>Super</span>
          </label>
          <input
            className="starItem"
            id="star-four"
            value="4"
            type="radio"
            name="star"
            onClick={(e) => {
              if (e.target.checked) {
                setRating(0);
              }
            }}
            onChange={(e) => handleChange(e)}
            checked={rating === 4}
          />
          <label htmlFor="star-four">
            &#9733;<span>Cool</span>
          </label>
          <input
            className="starItem"
            id="star-three"
            value="3"
            type="radio"
            name="star"
            onClick={(e) => {
              if (e.target.checked) {
                setRating(0);
              }
            }}
            onChange={(e) => handleChange(e)}
            checked={rating === 3}
          />
          <label htmlFor="star-three">
            &#9733;<span>Good</span>
          </label>
          <input
            className="starItem"
            id="star-two"
            value="2"
            type="radio"
            name="star"
            onClick={(e) => {
              if (e.target.checked) {
                setRating(0);
              }
            }}
            onChange={(e) => handleChange(e)}
            checked={rating === 2}
          />
          <label htmlFor="star-two">
            &#9733;<span>Pas Bien</span>
          </label>
          <input
            className="starItem"
            id="star-one"
            value="1"
            type="radio"
            name="star"
            onClick={(e) => {
              if (e.target.checked) {
                setRating(0);
              }
            }}
            onChange={(e) => handleChange(e)}
            checked={rating === 1}
          />
          <label htmlFor="star-one">
            &#9733;<span>Not Good</span>
          </label>
          {rating !== 0 && message === "" && (
            <CustomButton rating type="submit">
              Submit
            </CustomButton>
          )}
        </form>
        {message !== "" && (
          <div className="rating-message">
            <span> {message}</span>

            <CustomDeleteButton onClick={() => handleRatingRemove()} remove>
              Remove my rating
            </CustomDeleteButton>
          </div>
        )}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    userId: state.auth.user._id,
  };
};

export default connect(mapStateToProps, { getFavorites, createAlert })(
  RatingModal
);
