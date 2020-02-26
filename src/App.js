import React from "react";
import Aux from "./hoc/Aux";
import { Switch, Route } from "react-router-dom";
import Landing from "../src/containers/Landing/landing";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
function App() {
  return (
    <Aux>
      <Navigation />
      <Switch>
        <Route to="/" exact component={Landing} />
      </Switch>
    </Aux>
  );
}

export default App;
