import React, { useState } from "react";
import "./auth.css";
import Aux from "../../hoc/Aux";
import CustomButton from "../../components/CustomButton/customButton";
import CustomInput from "../../components/CustomInput/CustomInput";

const Auth = () => {
  const [classesName, setClasses] = useState({
    classes: ["cont"]
  });
  const { classes } = classesName;

  return (
    <Aux>
      <p className="tip">
        {classes.includes("s--signup") ? "Sign Up" : "Login"}
      </p>
      <div className={classes.join(" ")}>
        <div className="form sign-in-box">
          <h2>Welcome back,</h2>
          <form>
            <CustomInput type="email" name="email">
              Email
            </CustomInput>
            <CustomInput type="password" name="password">
              Password
            </CustomInput>
            <p className="forgot-pass">Forgot password?</p>
            <CustomButton type="submit">Sign In</CustomButton>
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
            <form>
              <CustomInput type="text" name="name">
                Name
              </CustomInput>
              <CustomInput type="email" name="email">
                Email
              </CustomInput>
              <CustomInput type="password" name="password">
                Password
              </CustomInput>
              <CustomButton type="submit">Sign Up</CustomButton>
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

export default Auth;
