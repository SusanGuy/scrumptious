import React, { useState, useEffect } from "react";
import "./image.scss";

const Image = ({ image, id, setImageSrc, setImage }) => {
  const [error, setError] = useState("");
  const [outerButton, setOuterButton] = useState(["button_outer"]);
  const [imageDiv, setImageDiv] = useState(["uploaded_file_view"]);

  useEffect(() => {
    if (image.includes("spoonacular") && id) {
      setOuterButton(["button_outer", "file_uploading", "file_uploaded"]);
      setImageDiv(["uploaded_file_view", "show"]);
    }
    if (image === "") {
      setImageDiv(["uploaded_file_view"]);
      setOuterButton(["button_outer"]);
    }
  }, [image, id]);

  const imageChangeHandler = (e) => {
    const check = ["gif", "png", "jpg", "jpeg"];
    const val = e.target.files[0].name.split(".").pop().toLowerCase();
    if (!check.includes(val)) {
      setError("Not an Image ...");
    } else {
      setError("");

      setOuterButton([...outerButton, "file_uploading"]);
      setTimeout(function () {
        setOuterButton([...outerButton, "file_uploading", "file_uploaded"]);
      }, 3000);

      setTimeout(function () {
        setImageDiv([...imageDiv, "show"]);
      }, 3500);
    }
    setImage(e.target.files[0]);
    setImageSrc(URL.createObjectURL(e.target.files[0]));
  };

  const removeImageHandler = () => {
    setImage("");
    setImageSrc("");
    setImageDiv(["uploaded_file_view"]);
    setOuterButton(["button_outer"]);
  };
  return (
    <section className="recipe-image-upload">
      <h2 className="recipe-image-upload-title">Upload the recipe image</h2>
      <div className="container">
        <div className="panel">
          <div className={outerButton.join(" ")}>
            <div className="btn_upload">
              <input
                onChange={(e) => imageChangeHandler(e)}
                type="file"
                id="upload_file"
                name=""
              />
              Upload Image
            </div>
            <div className="processing_bar"></div>
            <div className="success_box"></div>
          </div>
        </div>
        <div className="error_msg">{error !== "" && error}</div>
        <div className={imageDiv.join(" ")}>
          <span onClick={() => removeImageHandler()} className="file_remove">
            X
          </span>
          {image && <img src={image} alt="Recipe" />}
        </div>
      </div>
    </section>
  );
};

export default Image;
