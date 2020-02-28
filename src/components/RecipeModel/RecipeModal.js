import React, { useRef, useEffect, useCallback } from "react";
import "./RecipeModal.css";
import ModalCard from "./ModalCard/ModalCard";
import { hideModal } from "../../store/actions/recipeModal";
import { connect } from "react-redux";
const RecipeModal = ({
  hidden,
  hideModal,
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
  }
}) => {
  const handleClick = useCallback(
    e => {
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

  return (
    <div className="full-bk clear">
      <div ref={node} className="widget-frame">
        <div className="actions">
          <a href="#">Save</a>
        </div>
        <div
          className="img-bk active"
          data-img="step0"
          style={{
            backgroundImage: `url(${src})`
          }}
        ></div>
        <div className="img-bk"></div>
        <div className="img-bk"></div>
        <div className="img-bk"></div>
        <div className="img-bk"></div>

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

          {instructions.split(".").map(instruction => {
            if (instruction === "" || Number.isInteger(parseInt(instruction))) {
              return null;
            } else {
              track++;
              if (instruction.includes("<p>")) {
                instruction = instruction.replace(/<p>/g, "");
              }
              if (instruction.includes("</p>")) {
                instruction = instruction.replace(/<\/p>/g, "");
              }
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

const mapStateToProps = state => {
  return {
    hidden: state.modal.hidden
  };
};

export default connect(mapStateToProps, { hideModal })(RecipeModal);
