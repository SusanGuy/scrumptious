import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import Landing from "../src/containers/Landing/landing";
import "./App.css";

function App() {
  return (
    <Fragment>
      <Switch>
        <Route to="/" exact component={Landing} />
      </Switch>
    </Fragment>
  );
}

export default App;
