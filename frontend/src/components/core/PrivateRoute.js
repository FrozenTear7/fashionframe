import React from "react";
import { Route } from "react-router-dom";
import { Redirect } from "react-router";

const PrivateRoute = ({ component: Component, isAuthorized, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (isAuthorized) return <Component {...props} {...rest} />;
        else return <Redirect push to="/" />;
      }}
    />
  );
};

export default PrivateRoute;
