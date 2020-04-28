import React from "react";
import "./user.css";
import UserActionButton from "../../../components/userActionButton/actionButton";
const user = ({ id, name, history, clicked, avatar }) => {
  return (
    <li className="card-admin">
      <div className="card-image">
        <img
          src={
            avatar
              ? `http://localhost:5000${avatar}`
              : "https://s3-us-west-2.amazonaws.com/s.cdpn.io/310408/psychopomp-500.jpg"
          }
          alt="Psychopomp"
        />
      </div>
      <div className="card-admin-description">
        <h2>{name}</h2>
        <div className="admin-buttons">
          <UserActionButton
            clicked={() => history.push(`/users/recipes/${id}`)}
            view
          />
          <UserActionButton clicked={() => clicked(id)} remove />
        </div>
      </div>
    </li>
  );
};

export default user;
