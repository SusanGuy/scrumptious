import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signout } from "../../store/actions/auth";
import { resetFilters } from "../../store/actions/filter";
import { clearUser } from "../../store/actions/user";
const Logout = ({ signout, resetFilters, clearUser }) => {
  useEffect(() => {
    signout();
    resetFilters();
    clearUser();
  }, [signout, resetFilters, clearUser]);
  return <Redirect to="/auth" />;
};

export default connect(null, { signout, resetFilters, clearUser })(Logout);
