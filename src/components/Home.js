import React from "react";
import Search from "./Search";
import { logout } from '../actions/auth';
import { useDispatch, useSelector } from "react-redux";

function Home() {
  const dispatch = useDispatch();
  return (
    <>
      <Search />
      <button
        onClick={() => dispatch(logout())}
        //disabled={loading}
        type="submit"
        className="btn btn-primary btn-block"
        value="Login"
      >
        logout
      </button>
    </>
  );
}

export default Home;
