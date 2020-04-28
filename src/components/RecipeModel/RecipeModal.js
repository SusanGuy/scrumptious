import React, { useRef, useEffect, useCallback } from "react";
import "./RecipeModal.css";
import { withRouter } from "react-router-dom";
import ModalCard from "./ModalCard/ModalCard";
import AuthButton from "../authButton/authButton";
import { hideModal } from "../../store/actions/recipeModal";
import { addToCart } from "../../store/actions/user";
import { connect } from "react-redux";
import StarRating from "./StarRating/StarRating";
import uuid from "react-uuid";
const RecipeModal = ({
  hidden,
  hideModal,
  history,
  addToCart,
  userId,
  isAdmin,
  recipe: {
    title,
    time,
    src,
    instructions,
    ingredients,
    nutrients,
    calories,
    cost,
    id,
    feedbacks,
    creator,
    ...rest
  },
}) => {
  const handleClick = useCallback(
    (e) => {
      if (node.current.contains(e.target)) {
        return;
      }
      hideModal();
    },
    [hideModal]
  );

  useEffect(() => {
    if (hidden) {
      document.body.style.overflow = "hidden";
    }
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
      document.body.style.overflow = "unset";
    };
  }, [hidden, handleClick]);
  const node = useRef();
  let track = 0;

  let action = null;
  if (userId) {
    if (
      (creator === null || creator.toString() !== userId.toString()) &&
      !isAdmin
    ) {
      action = (
        <AuthButton onClick={() => addToCart(id, history)} save>
          Add to Favorites
        </AuthButton>
      );
    }
  }

  return (
    <div className="full-bk clear">
      <div ref={node} className="widget-frame">
        <div className="actions">{action}</div>

        <div
          className="img-bk active"
          data-img="step0"
          style={{
            backgroundImage: `url(${
              src.includes("spoonacular") ? src : `http://localhost:5000${src}`
            })`,
          }}
        ></div>

        <div className="time-wrap">
          <div>
            <span className="time">{time}</span>
            <span className="meta">min</span>
          </div>
        </div>
        <div className="right clear">
          <section className="title-meta" data-step="step0">
            <h2>{title}</h2>
            <h5>
              <i className="fas fa-dollar-sign"></i>
              <span> {(cost / 100).toFixed(2)}</span>
            </h5>
            <StarRating feedbacks={feedbacks} />
          </section>

          <ModalCard ingredients={ingredients}>Ingredients</ModalCard>
          <ModalCard allergies={rest}>Allergies</ModalCard>
          <ModalCard nutrition={{ ...nutrients, calories }}>
            Nutrients - Breakdown
          </ModalCard>

          {instructions.split(".").map((instruction) => {
            if (instruction.includes("<p>")) {
              instruction = instruction.replace(/<p>/g, "");
            }
            if (instruction.includes("<br>")) {
              instruction = instruction.replace(/<br>/g, "");
            }
            if (instruction.includes("</p>")) {
              instruction = instruction.replace(/<\/p>/g, "");
            }
            if (instruction === "" || Number.isInteger(parseInt(instruction))) {
              return null;
            } else {
              track++;
              return (
                <section key={uuid()} className="steps">
                  <h3>Step {track}</h3>
                  <p>{instruction}</p>
                </section>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    hidden: state.modal.hidden,
    userId: state.auth.user && state.auth.user._id,
    isAdmin: state.auth.user && state.auth.user.isAdmin,
  };
};

export default connect(mapStateToProps, { hideModal, addToCart })(
  withRouter(RecipeModal)
);
