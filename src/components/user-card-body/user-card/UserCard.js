import React from "react";
import Aux from "../../../hoc/Aux";
import { withRouter, Link } from "react-router-dom";
import moment from "moment";
import "./userCard.css";
const UserCard = (props) => {
  const cursor = props.new ? "unset" : "pointer";
  return (
    <div className="user-card-column">
      <div
        onClick={() => {
          return props.history.push(`/recipes/${props.id}`);
        }}
        style={{
          cursor,
        }}
        className="user-card-inner"
      >
        {props.new ? (
          <div className="new-campaign-tile">
            <div className="new-campaign-tile-body">
              <Link className="new-campaign-link" to="/recipes">
                <div className="new-campaign-logo"></div>
                Create your own recipe
              </Link>
            </div>
          </div>
        ) : (
          <Aux>
            <div className="user-card-image-wrapper">
              <div className="user-card-image-wrapper-row">
                <img alt="" src={props.image} />
              </div>
            </div>
            <div className="main-image-container">
              <img alt="" src={props.image} />
            </div>
            <div className="campaign-action-tile-content">
              <div className="campaign-action-tile-title">{props.title}</div>
              <div className="campaign-action-tile-info">
                {props.recipes ? "Created " : "Added "}
                {moment(props.created).fromNow()}
              </div>
            </div>
          </Aux>
        )}
      </div>
    </div>
  );
};

export default withRouter(UserCard);
