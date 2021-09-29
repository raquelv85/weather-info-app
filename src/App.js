import React, {useEffect, useState} from "react";

//components
import Home from './components/Home';
import Header from './components/layout/Header';

//routes
import PrivateRoute from './routers/PrivateRoute'
import PublicRoute from './routers/PublicRoute'
import AuthRouter from './routers/AuthRouter'

//firebase
import { 
  getAuth,
  onAuthStateChanged
} from "./firebase/firebase-config"

//react-router
import {
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";

//redux
import { useDispatch } from "react-redux";
import { loginSuccess } from './actions/auth'
import { loadSearch } from './actions/searches'
import { logout } from './actions/auth'

 
function App() {

  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(getAuth(),(user) => {
        if(user?.uid){
            dispatch(loginSuccess(user.uid))
            dispatch(loadSearch(user.uid))
            setIsLogin(true)
        }else {
            setIsLogin(false)
        }

    });
  }, []);

  return (
    <>
    <Header isAuth={isLogin} logout={() => dispatch(logout())}/>
    <Router>
      <div>
        <Switch>
          <PublicRoute path="/auth" isAuth={isLogin} component={AuthRouter}/>
          <PrivateRoute exact path="/" isAuth={isLogin} component={Home}/>
          <Redirect to="/auth/signin" />
        </Switch>
      </div>
    </Router>
    </>
  );
}

export default App;
