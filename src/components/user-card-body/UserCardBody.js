import React, { useState } from "react";
import "./UserCardBody.css";
import RatingModal from "../../components/RatingModal/RatingModal";
import UserCard from "./user-card/UserCard";
const UserCardBody = ({ favorites, recipes, userRecipes, clicked, error }) => {
  const [hidden, setHidden] = useState(true);
  const [id, setId] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);

  let cards;
  if (recipes) {
    cards = recipes.map(
      ({ _id: id, recipe: { title, image, _id }, createdAt }) => (
        <UserCard
          recipes
          id={id}
          link={_id}
          key={_id}
          image={image}
          title={title}
          created={createdAt}
        />
      )
    );
  } else if (favorites) {
    cards = favorites.map(
      ({ _id: id, recipe: { title, image, _id, feedbacks }, createdAt }) => (
        <UserCard
          feedbacks={feedbacks}
          setFeedbacks={setFeedbacks}
          setId={setId}
          setHidden={setHidden}
          key={id}
          id={id}
          link={_id}
          image={image}
          title={title}
          created={createdAt}
        />
      )
    );
  } else if (userRecipes) {
    cards = userRecipes.map(
      ({ _id: id, recipe: { title, image, _id }, createdAt }) => (
        <UserCard
          clicked={clicked}
          recipeId={_id}
          userRecipes
          key={id}
          id={id}
          image={image}
          title={title}
          created={createdAt}
        />
      )
    );
  } else if (error) {
    cards = (
      <p
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          fontSize: "30px",
          marginTop: "20px",
          color: "#12343b",
        }}
      >
        {error}
      </p>
    );
  }

  return (
    <div className="user-card-container">
      <div className="user-card-body">{cards}</div>
      {favorites && !hidden && (
        <RatingModal
          id={id}
          feedbacks={feedbacks}
          hidden={hidden}
          setHidden={setHidden}
        />
      )}
      {recipes && recipes.length === 0 && <UserCard new />}
    </div>
  );
};

export default UserCardBody;
