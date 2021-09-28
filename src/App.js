import React from "react";
import Search from './components/Search'
import Home from './components/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';



import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
 


function App() {
  
  
  return (

    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/signin">Login</Link>
            </li>
            <li>
              <Link to="/signup">Registro</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/signin">
            <Login />
          </Route>
          <Route path="/signup">
            <Register />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
