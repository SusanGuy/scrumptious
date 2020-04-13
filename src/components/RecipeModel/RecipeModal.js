import React, { useRef, useEffect, useCallback } from "react";
import "./RecipeModal.css";
import { withRouter } from "react-router-dom";
import ModalCard from "./ModalCard/ModalCard";
import AuthButton from "../authButton/authButton";
import { hideModal } from "../../store/actions/recipeModal";
import { createAlert } from "../../store/actions/alert";
import { connect } from "react-redux";
import axios from "../../axios";
const RecipeModal = ({
  hidden,
  hideModal,
  isAuthenticated,
  history,
  createAlert,
  recipe: {
    title,
    time,
    src,
    instructions,
    ingredients,
    nutrients,
    calories,
    cost,
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

  const addToCart = async () => {
    try {
      await axios.post(`/recipes/${rest.id}`);
      history.push("/favorites");
      createAlert("Reciped added to your favorites succesfully", "success");
    } catch (err) {
      hideModal();
      createAlert("Reciped already added to your favorites", "failure");
    }
  };

  return (
    <div className="full-bk clear">
      <div ref={node} className="widget-frame">
        <div className="actions">
          <AuthButton
            onClick={() =>
              isAuthenticated ? addToCart() : history.push("/auth")
            }
            save
          >
            {isAuthenticated ? "Add to Favorites" : "Login to Save"}
          </AuthButton>
        </div>
        <div
          className="img-bk active"
          data-img="step0"
          style={{
            backgroundImage: `url(${src})`,
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
            <img
              className="stars"
              src="https://static.tumblr.com/e1u6zhi/7gDndrvtx/star-star-star-star-star.png"
              height="16px"
              alt="reviews"
            />
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
                <section key={instruction} className="steps">
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
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps, { hideModal, createAlert })(
  withRouter(RecipeModal)
);
