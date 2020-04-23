import React from "react";
import "./UserCardBody.css";
import UserCard from "./user-card/UserCard";
const UserCardBody = ({ favorites, recipes, error }) => {
  let cards;
  if (recipes) {
    cards = recipes.map(({ image, title, _id, createdAt }) => (
      <UserCard
        recipe
        id={_id}
        key={_id}
        image={image}
        title={title}
        created={createdAt}
      />
    ));
  } else if (favorites) {
    cards = favorites.map(
      ({ _id: id, recipe: { title, image, _id }, createdAt }) => (
        <UserCard
          favorite
          id={id}
          link={_id}
          key={_id}
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
        {recipes && <UserCard new />}
      </div>
    </div>
  );
};

export default UserCardBody;
