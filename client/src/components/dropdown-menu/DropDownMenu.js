import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Image from "../ppImage/ppImage";
import "./DropDownMenu.scss";
import { connect } from "react-redux";
import Aux from "../../hoc/Aux";
import DropDownItem from "./dropdown-item/dropdownItem";
const DropDownMenu = ({ user }) => {
  const [hidden, setHidden] = useState(false);
  const node = useRef();

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      return;
    }
    setHidden(false);
  };

  return (
    <li className=" logged-in">
      <div className="dropdown">
        <Link
          className="dropdown-link"
          to={user && user.isAdmin ? "/users" : "/my-recipes"}
        >
          <button className="dropdown-button">
            <Image
              name={user ? user.name : "user's image"}
              avatar={user && user.avatar ? user.avatar : null}
            />
          </button>
        </Link>
        <span ref={node} onClick={() => setHidden(!hidden)} className="caret" />
      </div>
      {hidden && (
        <ul className="dropdown-menu">
          {user && !user.isAdmin ? (
            <Aux>
              <DropDownItem link="/my-favorites">Favorites</DropDownItem>
              <DropDownItem link="/my-recipes">My Recipes</DropDownItem>
              <DropDownItem link="/my-fridge">My Fridge</DropDownItem>
              <DropDownItem link="/my-profile">My Profile</DropDownItem>
            </Aux>
          ) : (
            <Aux>
              <DropDownItem link="/users">All Users</DropDownItem>
            </Aux>
          )}
          <DropDownItem link="/account-settings">Account Settings</DropDownItem>
        </ul>
      )}
    </li>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(DropDownMenu);
