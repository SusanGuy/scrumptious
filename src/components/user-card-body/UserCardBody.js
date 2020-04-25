import React from "react";
import "./UserCardBody.css";
import UserCard from "./user-card/UserCard";
const UserCardBody = ({ favorites, recipes, error }) => {
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
      ({ _id: id, recipe: { title, image, _id }, createdAt }) => (
        <UserCard
          key={id}
          id={id}
          link={_id}
          image={image}
          title={title}
          created={createdAt}
        />
      )
    );
  } else if (error) {
    cards = <p>{error}</p>;
  }

  return (
    <div className="user-card-container">
      <div className="user-card-row">
        <div className="user-card-body">{cards}</div>
        {recipes && recipes.length === 0 && <UserCard new />}
      </div>
    </div>
  );
};

export default UserCardBody;
