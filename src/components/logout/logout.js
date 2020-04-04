import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signout } from "../../store/actions/auth";

const Logout = ({ signout }) => {
  useEffect(() => {
    signout();
  }, [signout]);
  return <Redirect to="/auth" />;
};

export default connect(null, { signout })(Logout);
