import React, { useEffect, useState } from "react";
import CustomButton from "../../components/CustomButton/customButton";
import CustomInput from "../../components/input/input";
import Label from "../../components/label/label";
import { connect } from "react-redux";

import Aux from "../../hoc/Aux";
import {
  uploadImage,
  deleteImage,
  clearErrors,
  updateForm,
  deleteAccount,
} from "../../store/actions/auth";
import Image from "../../components/ppImage/ppImage";
import CustomActionButton from "../../components/custom-action-button/actionButton";
import Spinner from "../../components/Spinner/Spinner";
import ErrorBox from "../../components/errorMessage/errorMessage";
import PasswordModal from "../../components/changePassword/changePassword";
import CustomInputContainer from "../../components/customInputContainer/customInputContainer";
import "./account.scss";

const Account = ({
  user,
  uploadImage,
  loading,
  deleteImage,
  error,
  clearErrors,
  updateForm,
  deleteAccount,
}) => {
  const [formData, setformData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  useEffect(() => {
    clearErrors();
    setformData({
      first_name: !user ? " " : user.name.split(" ")[0],
      last_name: !user
        ? " "
        : user.name.split(" ")[1] !== "undefined"
        ? user.name.split(" ")[1]
        : "",
      email: !user ? " " : user.email,
    });
  }, [user, clearErrors]);
  const { first_name, last_name, email } = formData;
  const [hidden, setHidden] = useState(false);

  const handleChange = (e) => {
    if (error) {
      clearErrors();
    }
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateForm({ name: first_name + " " + last_name });
  };

  if ((loading || !user) && !hidden) {
    return <Spinner />;
  }

  return (
    <Aux>
      {hidden && (
        <PasswordModal hidden={hidden} hidePasswordModal={setHidden} />
      )}
      <div className="account-settings-container">
        <div className="account-settings-row">
          <form onSubmit={(e) => handleSubmit(e)}>
            <CustomInputContainer
              first_name={first_name}
              last_name={last_name}
              onChange={(e) => handleChange(e)}
            />
            <Label>Photo</Label>
            <div className="account-settings-photo">
              <div
                onClick={() => document.getElementById("chooseFile").click()}
                className="account-settings-avatar"
              >
                <span className="over-image">
                  <i className="fas fa-upload"></i>
                </span>
                <Image
                  name={user.name ? user.name : "user's image"}
                  avatar={user.avatar ? user.avatar : null}
                />

                <input
                  id="chooseFile"
                  type="file"
                  onChange={(e) => uploadImage(e.target.files[0])}
                  name="upload"
                  className="file-upload"
                  accept="image/*"
                />
              </div>
              {user.avatar && (
                <CustomActionButton
                  remove
                  onClick={(e) => {
                    e.preventDefault();
                    deleteImage();
                  }}
                >
                  Remove
                </CustomActionButton>
              )}
            </div>
            {error.errMessage && <ErrorBox>{error.errMessage}!</ErrorBox>}
            <Label>Email</Label>
            <div className="account-settings-input settings-input-email">
              <CustomInput
                name="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => handleChange(e)}
                required
                disabled
              />
            </div>
            {error.emailError && <ErrorBox>{error.emailError}!</ErrorBox>}

            <div className="account-settings-password">
              <CustomActionButton
                onClick={(e) => {
                  e.preventDefault();
                  setHidden(true);
                }}
              >
                Change
              </CustomActionButton>
            </div>
            <div className="dotted-line"></div>
            {!user.isAdmin && (
              <div className="delete-account-row">
                <div className="delete-account-description">
                  Deleting your account will remove all of your activity and
                  recipes, and you will no longer be able to sign in with this
                  account.
                </div>
                <div className="delete-account-button">
                  <CustomActionButton onClick={() => deleteAccount()} remove>
                    Delete Account
                  </CustomActionButton>
                </div>
              </div>
            )}
            <div className="save-changes-button">
              <CustomButton type="submit" width="50%">
                Save Changes
              </CustomButton>
            </div>
          </form>
        </div>
      </div>
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    user: state.auth.user,
    error: state.auth.error,
  };
};

export default connect(mapStateToProps, {
  uploadImage,
  deleteImage,
  clearErrors,
  updateForm,
  deleteAccount,
})(Account);
