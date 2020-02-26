import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute.js";
import SignIn from "./signin/SignIn.js";
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
          <Route exact path="/fashionframe/" component={SearchList} />
          <Route exact path="/fashionframe/signin" component={SignIn} />
          <PrivateRoute
            exact
            path="/fashionframe/settings"
            component={Settings}
            isAuthorized={this.props.isAuthorized}
            userData={this.props.userData}
          />
          <PrivateRoute
            exact
            path="/fashionframe/setups/new"
            component={NewSetup}
            isAuthorized={this.props.isAuthorized}
            mode="new"
          />
          <PrivateRoute
            exact
            path="/fashionframe/setups/:id/edit"
            component={NewSetup}
            isAuthorized={this.props.isAuthorized}
            mode="edit"
          />
          <Route
            exact
            path="/fashionframe/setups/:id"
            render={props => (
              <Setup
                {...props}
                isAuthorized={this.props.isAuthorized}
                userId={this.props.userData.id}
              />
            )}
          />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default Main;
