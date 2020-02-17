import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute.js";
import MainPanel from "./MainPanel.js";
import NotFound from "./NotFound.js";
import Settings from "./Settings.js";

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <Switch>
          <Route exact path="/" component={MainPanel} />
          <PrivateRoute
            exact
            path="/settings"
            component={Settings}
            {...this.props}
          />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default Main;
