import React, {useState} from "react";
import { useForm } from "../../hooks/useForm"
import { Link } from "react-router-dom";

function Login() {

  const [loading, setLoading] = useState(false)
  const [formValues, handleInputChange] = useForm({
    email: "test@test.com",
    password: "123456",
  });

  const { email, password } = formValues;


  return (
    <>
      <h3 className="auth__title">Login</h3>

      <form >
        <input
          type="text"
          placeholder="Email"
          name="email"
          className="auth__input"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          className="auth__input"
          value={password}
          onChange={handleInputChange}
        />

        <button
          disabled={loading}
          type="submit"
          className="btn btn-primary btn-block"
        >
          Login
        </button>


        <Link to="/signup" className="link">
          Create new account
        </Link>
      </form>
    </>
  );
}

export default Login;
