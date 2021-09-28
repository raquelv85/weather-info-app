import React from "react";

//react-router
import { Route, Redirect } from "react-router-dom";

const PublicRoute = ({ isAuth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) =>
        isAuth ?  <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};


export default PublicRoute;
