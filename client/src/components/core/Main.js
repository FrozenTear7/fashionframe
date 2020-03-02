import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute.js";
import SignIn from "./signin/SignIn.js";
import NotFound from "./NotFound.js";
import Settings from "./Settings.js";
import NewSetup from "../setups/newSetup/NewSetup.js";
import Search from "../search/Search.js";
import Setup from "../setups/setup/Setup.js";
import Profile from "../profile/Profile.js";
import MainPanel from "./MainPanel.js";

const Main = props => {
  const { isAuthorized, userData } = props;

  return (
    <div className="container-fluid main-body">
      <Switch>
        <Route exact path="/" component={MainPanel} />
        <Route exact path="/fashionframe/" component={Search} />
        <Route
          exact
          path="/fashionframe/profile/:id"
          render={props => (
            <Profile
              {...props}
              isAuthorized={isAuthorized}
              userData={userData}
            />
          )}
        />
        <Route exact path="/fashionframe/signin" component={SignIn} />
        <PrivateRoute
          exact
          path="/fashionframe/settings"
          component={Settings}
          isAuthorized={isAuthorized}
          userData={userData}
        />
        <PrivateRoute
          key="new"
          exact
          path="/fashionframe/setups/new"
          component={NewSetup}
          isAuthorized={isAuthorized}
          mode="new"
        />
        <PrivateRoute
          key="edit"
          exact
          path="/fashionframe/setups/:id/edit"
          component={NewSetup}
          isAuthorized={isAuthorized}
          mode="edit"
        />
        <Route
          exact
          path="/fashionframe/setups/:id"
          render={props => (
            <Setup
              {...props}
              isAuthorized={isAuthorized}
              userId={userData.id}
            />
          )}
        />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default Main;
