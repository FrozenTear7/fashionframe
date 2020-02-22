import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute.js";
import MainPanel from "./MainPanel.js";
import SignIn from "./SignIn.js";
import NotFound from "./NotFound.js";
import Settings from "./Settings.js";
import NewBuild from "../builds/NewBuild.js";
import SearchList from "../search/SearchList.js";

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
            path="/builds"
            component={NewBuild}
            isAuthorized={this.props.isAuthorized}
          />
          <PrivateRoute
            path="/builds/:id"
            component={NewBuild}
            isAuthorized={this.props.isAuthorized}
          />
          <PrivateRoute
            exact
            path="/builds/new"
            component={NewBuild}
            isAuthorized={this.props.isAuthorized}
          />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default Main;
