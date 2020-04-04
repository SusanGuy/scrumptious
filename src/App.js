import React from "react";
import Aux from "./hoc/Aux";
import { Switch, Route } from "react-router-dom";
import Auth from "./containers/Auth/auth";
import Landing from "../src/containers/Landing/landing";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
function App() {
  return (
    <Aux>
      <Navigation />
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route to="/" exact component={Landing} />
      </Switch>
    </Aux>
  );
}

export default App;
