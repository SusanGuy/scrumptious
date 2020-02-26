import React, { useRef, useEffect, useCallback } from "react";
import "./RecipeModal.css";
import { hideModal } from "../../store/actions/recipeModal";
import { connect } from "react-redux";
const RecipeModal = ({
  hidden,
  hideModal,
  recipe: { title, time, src, instructions, ingredients, nutrients, calories }
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
            <img
              className="stars"
              src="https://static.tumblr.com/e1u6zhi/7gDndrvtx/star-star-star-star-star.png"
              height="16px"
            />
          </section>

          <div className="ingredients">
            <h4 className="ingredient-list">Ingredients</h4>
            <ul>
              <li>2 cups all-purpose flour</li>
              <li>2 teaspoons baking powder</li>
              <li>¼ teaspoon salt</li>
              <li>1 tablespoon sugar, optional</li>
              <li>2 eggs</li>
              <li>1 ½ to 2 cups milk</li>
              <li>2 tablespoons butter </li>
            </ul>
          </div>
          <div className="ingredients">
            <h4 className="nutrients-breakdown">Nutrients-Breakdown</h4>
            <ul>
              <li>Total Calories: {calories} </li>
              <li>Protein: {nutrients.protein}</li>
              <li>Carbs: {nutrients.carbs}</li>
              <li>Fat: {nutrients.fat}</li>
            </ul>
          </div>
          <section className="steps" data-step="step1" data-time="5">
            <h3>Step 1</h3>
            <p>
              Instead of using only wheat flour in these pancakes, I’ve combined
              whole-wheat flour and almond flour. The almond flour makes for a
              very moist and delicate pancake. Almond flour is high in vitamin
              E, calcium, magnesium and copper.
            </p>
          </section>

          <section className="steps">
            <h3>Step 2</h3>
            <p>
              Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut
              in nulla enim. Phasellus molestie magna non est bibendum non
              venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.
              Mauris iaculis porttitor posuere. Praesent id metus massa, ut
              blandit odio. Proin quis tortor orci. Etiam at risus et justo
              dignissim congue. Donec congue lacinia dui, a porttitor lectus
              condimentum laoreet. Nunc eu ullamcorper orci. Quisque eget odio
              ac lectus vestibulum.
            </p>
          </section>

          <section className="steps">
            <h3>Step 3</h3>
            <p>
              Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut
              in nulla enim. Phasellus molestie magna non est bibendum non
              venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.
              Mauris iaculis porttitor posuere. Praesent id metus massa, ut
              blandit odio. Proin quis tortor orci. Etiam at risus et justo
              dignissim congue. Donec congue lacinia dui, a porttitor lectus
              condimentum laoreet. Nunc eu ullamcorper orci. Quisque eget odio
              ac lectus vestibulum.
            </p>
          </section>

          <section className="steps">
            <h3>Step 4</h3>
            <p>
              Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut
              in nulla enim. Phasellus molestie magna non est bibendum non
              venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.
              Mauris iaculis porttitor posuere. Praesent id metus massa, ut
              blandit odio. Proin quis tortor orci. Etiam at risus et justo
              dignissim congue. Donec congue lacinia dui, a porttitor lectus
              condimentum laoreet. Nunc eu ullamcorper orci. Quisque eget odio
              ac lectus vestibulum.
            </p>
            <p>
              Quisque eget odio ac lectus vestibulum faucibus eget in metus. In
              pellentesque faucibus vestibulum. Nulla at nulla justo, eget
              luctus tortor. Nulla facilisi. Duis aliquet egestas purus in
              blandit. Curabitur vulputate, ligula lacinia scelerisque tempor,
              lacus lacus ornare ante, ac egestas est urna sit amet arcu.
              className aptent taciti sociosqu ad litora torquent per conubia
              nostra, per inceptos himenaeos. Sed molestie augue sit amet leo
              consequat posuere. Vestibulum ante ipsum primis in faucibus orci
              luctus et ultrices posuere cubilia Curae; Proin vel ante a orci
              tempus eleifend ut et magna. Lorem ipsum dolor.
            </p>
          </section>
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
