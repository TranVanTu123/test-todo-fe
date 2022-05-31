import React from "react";
import "./index.css";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Signup />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
