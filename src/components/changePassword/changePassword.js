import React, { useState, useRef, useEffect, useCallback } from "react";
import "./changePassword.css";
import CloseButton from "../../components/close-button/closeButton";
import CustomInput from "../input/input";
import { clearErrors, changePassword } from "../../store/actions/auth";
import { connect } from "react-redux";
import { hidePasswordModal } from "../../store/actions/ui";
import CustomButton from "../CustomButton/customButton";
import Spinner from "../Spinner/Spinner";

import ErrorBox from "../errorMessage/errorMessage";
const ChangePassword = ({
  hidePasswordModal,
  changePassword,
  loading,
  error,
  clearErrors,
  hidden,
}) => {
  const node = useRef();

  const [formData, setFormData] = useState({
    current_password: "",
    new_password: "",
    confirm_new_password: "",
  });

  const handleClick = useCallback(
    (e) => {
      if (node.current.contains(e.target)) {
        return;
      }
      hidePasswordModal();
    },
    [hidePasswordModal]
  );

  useEffect(() => {
    clearErrors();
    if (hidden) {
      document.body.style.overflow = "hidden";
    }
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
      document.body.style.overflow = "unset";
    };
  }, [clearErrors, hidden, handleClick]);

  const { current_password, new_password, confirm_new_password } = formData;
  const handleChange = (e) => {
    if (Object.keys(error).length !== 0) {
      clearErrors();
    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    changePassword(current_password, new_password, confirm_new_password);
  };

  return (
    <div className="password-settings-container">
      <div ref={node} className="password-change-modal">
        <div className="password-modal-header">
          <div className="overlay-header">Set your password</div>
          <CloseButton
            passwordChange
            onClick={(e) => {
              e.preventDefault();
              hidePasswordModal();
            }}
          />
        </div>
        <div className="password-change-content">
          <div className="password-form-header">
            <strong>
              Be sure to choose a strong password with both letters and numbers.
            </strong>
          </div>

          <form onSubmit={(e) => handleSubmit(e)}>
            <CustomInput
              name="current_password"
              type="password"
              placeholder="Current Password"
              value={current_password}
              onChange={(e) => handleChange(e)}
              required
            />
            {error.passwordError && <ErrorBox>{error.passwordError}!</ErrorBox>}
            <CustomInput
              name="new_password"
              type="password"
              placeholder="New Password"
              value={new_password}
              onChange={(e) => handleChange(e)}
              required
            />
            {error.newPasswordError && (
              <ErrorBox>{error.newPasswordError}!</ErrorBox>
            )}
            <CustomInput
              name="confirm_new_password"
              type="password"
              placeholder="Confirm New Password"
              value={confirm_new_password}
              onChange={(e) => handleChange(e)}
              required
            />
            {error.confirmError && <ErrorBox>{error.confirmError}!</ErrorBox>}
            <div className="change-password-button">
              <CustomButton width="80%" type="submit">
                {loading ? (
                  <Spinner
                    margin="2px auto"
                    width="2em"
                    height="2em"
                    background="inherit"
                    color="white"
                  />
                ) : (
                  "Save Changes"
                )}
              </CustomButton>
            </div>
            {error.authError && <ErrorBox>{error.authError}!</ErrorBox>}
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    hidden: state.password.hidden,
  };
};

export default connect(mapStateToProps, {
  hidePasswordModal,
  clearErrors,
  changePassword,
})(ChangePassword);
