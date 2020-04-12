import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signout } from "../../store/actions/auth";
import { resetFilters } from "../../store/actions/filter";
const Logout = ({ signout, resetFilters }) => {
  useEffect(() => {
    signout();
    resetFilters();
  }, [signout, resetFilters]);
  return <Redirect to="/auth" />;
};

export default connect(null, { signout, resetFilters })(Logout);
