import React from "react";

//react-router
import { Switch, Route, Redirect, Link } from "react-router-dom";

//components
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";

const AuthRouter = () => {
  return (
    <div className="">
      <div className="">
        <nav>
          <ul>
            <li>
              <Link to="/auth/signin">Login</Link>
            </li>
            <li>
              <Link to="/auth/signup">Registro</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/auth/signin" component={Login} />

          <Route exact path="/auth/signup" component={Register} />

          <Redirect to="/auth/signin" />
        </Switch>
      </div>
    </div>
  );
};

export default AuthRouter;
