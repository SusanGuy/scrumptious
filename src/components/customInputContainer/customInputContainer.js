import React from "react";
import "./customInputContainer.css";
import Aux from "../../hoc/Aux";
import Label from "../label/label";
import CustomInput from "../input/input";
const customInputContainer = ({ first_name, last_name, onChange, ...rest }) => {
  return (
    <Aux>
      <Label>Full Name</Label>
      <div className="account-settings-input">
        <div className="input-row">
          <div className="input-column">
            <CustomInput
              name="first_name"
              type="text"
              placeholder="First Name"
              value={first_name}
              onChange={onChange}
              {...rest}
            />
          </div>
          <div className="input-column">
            <CustomInput
              name="last_name"
              type="text"
              placeholder="Last Name"
              value={last_name}
              onChange={onChange}
              {...rest}
            />
          </div>
        </div>
      </div>
    </Aux>
  );
};

export default customInputContainer;
