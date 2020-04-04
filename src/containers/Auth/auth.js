import React, { useState } from "react";
import "./auth.css";
import Aux from "../../hoc/Aux";
import CustomButton from "../../components/CustomButton/customButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import { connect } from "react-redux";
import { login, signup } from "../../store/actions/auth";
import Spinner from "../../components/Spinner/Spinner";
const Auth = ({ history, login, signup, loading }) => {
  const [classesName, setClasses] = useState({
    classes: ["cont"]
  });
  const { classes } = classesName;

  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const { name, email, password } = formData;

  const handleFormChange = e => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const clearFormValues = () => {
    setformData({
      name: "",
      email: "",
      password: ""
    });
  };

  const handleLoginSubmit = async e => {
    e.preventDefault();
    login(email, password, history);
  };

  const handleSignupSubmit = async e => {
    e.preventDefault();
    signup(name, email, password, history);
  };

  return (
    <Aux>
      <p className="tip">
        {classes.includes("s--signup") ? "Sign Up" : "Login"}
      </p>
      <div className={classes.join(" ")}>
        <div className="form sign-in-box">
          <h2>Welcome back,</h2>
          <form onSubmit={e => handleLoginSubmit(e)}>
            <CustomInput
              onChange={e => handleFormChange(e)}
              value={email}
              type="email"
              name="email"
              required
            >
              Email
            </CustomInput>
            <CustomInput
              onChange={e => handleFormChange(e)}
              value={password}
              type="password"
              name="password"
              required
            >
              Password
            </CustomInput>
            <p className="forgot-pass">Forgot password?</p>
            <CustomButton type="submit">
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
            <CustomButton facebook>
              Continue with <span>facebook</span>
            </CustomButton>
          </form>
        </div>
        <div className="sub-cont">
          <div className="img">
            <div className="img__text m--up">
              <h2>New here?</h2>
              <p>Sign up and discover great amount of new opportunities!</p>
            </div>
            <div className="img__text m--in">
              <h2>One of us?</h2>
              <p>
                If you already has an account, just sign in. We've missed you!
              </p>
            </div>
            <div
              className="img__btn"
              onClick={() => {
                clearFormValues();
                setClasses({
                  classes: classes.includes("s--signup")
                    ? ["cont"]
                    : [...classes, "s--signup"]
                });
              }}
            >
              <span className="m--up">Sign Up</span>
              <span className="m--in">Sign In</span>
            </div>
          </div>
          <div className="form sign-up-box">
            <h2>Time to feel like home,</h2>
            <form onSubmit={e => handleSignupSubmit(e)}>
              <CustomInput
                onChange={e => handleFormChange(e)}
                value={name}
                type="text"
                name="name"
                required
              >
                Name
              </CustomInput>
              <CustomInput
                onChange={e => handleFormChange(e)}
                value={email}
                type="email"
                name="email"
                required
              >
                Email
              </CustomInput>
              <CustomInput
                onChange={e => handleFormChange(e)}
                value={password}
                type="password"
                name="password"
                required
              >
                Password
              </CustomInput>
              <CustomButton type="submit">
                {" "}
                {loading ? (
                  <Spinner
                    margin="2px auto"
                    width="2em"
                    height="2em"
                    background="inherit"
                    color="white"
                  />
                ) : (
                  "Sign Up"
                )}
              </CustomButton>
              <CustomButton facebook>
                Join with <span>facebook</span>
              </CustomButton>
            </form>
          </div>
        </div>
      </div>
    </Aux>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading
  };
};

export default connect(mapStateToProps, { login, signup })(Auth);