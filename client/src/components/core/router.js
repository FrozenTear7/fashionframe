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

export default (
  // Switch is added in v4 react-router
  <Switch>
    <Route exact path="/" />
    <Route exact path="/fashionframe/" />
    <Route exact path="/fashionframe/profile/:id" />
    <Route exact path="/fashionframe/signin" />
    <PrivateRoute exact path="/fashionframe/settings" />
    <PrivateRoute key="new" exact path="/fashionframe/setups/new" />
    <PrivateRoute key="edit" exact path="/fashionframe/setups/:id/edit" />
    <Route exact path="/fashionframe/setups/:id" />
    <Route component={NotFound} />
  </Switch>
);
