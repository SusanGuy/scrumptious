import React, { useState, useRef, useEffect, useCallback } from "react";
import "./adminLogin.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import CustomButton from "../../components/CustomButton/customButton";
import CustomInput from "../../components/input/input";
import { login, clearErrors } from "../../store/actions/auth";
import ErrorBox from "../errorMessage/errorMessage";
import Spinner from "../../components/Spinner/Spinner";
const AdminLogin = ({
  hidden,
  hideAdminModal,
  login,
  history,
  error,
  clearErrors,
  loading,
}) => {
  const node = useRef();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleClick = useCallback(
    (e) => {
      if (node.current.contains(e.target)) {
        return;
      }

      hideAdminModal(true);
    },
    [hideAdminModal]
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

  const { email, password } = formData;
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
    login(email, password, history, true, hideAdminModal);
  };

  return (
    <div className="admin-wrapper">
      <div className="admin-main-modal">
        <form
          onSubmit={(e) => handleSubmit(e)}
          ref={node}
          className="admin-form-signin"
        >
          <h2 className="admin-form-signin-heading">Admin login</h2>
          <CustomInput
            type="text"
            name="email"
            placeholder="Email"
            required
            onChange={(e) => handleChange(e)}
          ></CustomInput>
          {error.emailError && <ErrorBox>{error.emailError}!</ErrorBox>}
          <CustomInput
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={(e) => handleChange(e)}
          ></CustomInput>
          {error.passwordError && <ErrorBox>{error.passwordError}!</ErrorBox>}
          <CustomButton admin type="submit">
            {loading ? (
              <Spinner
                margin="2px auto"
                width="2em"
                height="2em"
                background="#d4af7a"
                color="#d4af7a"
              />
            ) : (
              "Sign in"
            )}
          </CustomButton>
          {error.authError && <ErrorBox>{error.authError}!</ErrorBox>}
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
    loading: state.auth.loading,
  };
};

export default connect(mapStateToProps, { login, clearErrors })(
  withRouter(AdminLogin)
);
