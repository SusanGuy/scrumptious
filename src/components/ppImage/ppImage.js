import React from "react";
import "./ppImage.css";
const ppImage = ({ small, name, avatar }) => {
  const classes = ["profile-image"];
  if (small) {
    classes.push("dropdown-image");
  }

  return (
    <img
      className={classes.join(" ")}
      src={
        avatar
          ? avatar
          : "https://api.adorable.io/avatars/285/abott@adorable.io.png"
      }
      alt={name}
    />
  );
};

export default ppImage;
