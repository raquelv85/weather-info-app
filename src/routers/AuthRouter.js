import React from "react";

//react-router
import { Switch, Route, Redirect, Link } from "react-router-dom";

//components
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";

const AuthRouter = () => {
  return (
    <Switch>
      <Route exact path="/auth/signin" component={Login} />

      <Route exact path="/auth/signup" component={Register} />

      <Redirect to="/auth/signin" />
    </Switch>
  );
};

export default AuthRouter;
