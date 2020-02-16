import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute.js";
import MainPanel from "./MainPanel.js";
import Profile from "./Profile.js";
import NotFound from "./NotFound.js";

class Main extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={MainPanel} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default Main;
