import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute.js";
import MainPanel from "./MainPanel.js";
import SignIn from "./SignIn.js";
import NotFound from "./NotFound.js";
import Settings from "./Settings.js";
import NewSetup from "../setups/NewSetup.js";
import SearchList from "../search/SearchList.js";
import Setup from "../setups/Setup.js";

class Main extends Component {
  render() {
    return (
      <div className="container-fluid main-body">
        <Switch>
          <Route exact path="/" component={MainPanel} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/search" component={SearchList} />
          <PrivateRoute
            exact
            path="/settings"
            component={Settings}
            isAuthorized={this.props.isAuthorized}
            userData={this.props.userData}
          />
          <PrivateRoute
            exact
            path="/setups/new"
            component={NewSetup}
            isAuthorized={this.props.isAuthorized}
          />
          <Route exact path="/setups/:id" component={Setup} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default Main;
