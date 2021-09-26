import React, { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { Link } from "react-router-dom";

function Register() {
  const [formValues, handleInputChange] = useForm({
    email: "test@test.com",
    password: "123456",
    password2: "123456",
  });

  const { email, password, password2 } = formValues;

  return (
    <>
      <h3 className="auth__title">Register</h3>

      <form>
      
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

        <input
          type="password"
          placeholder="Confirm password"
          name="password2"
          className="auth__input"
          value={password2}
          onChange={handleInputChange}
        />

        <button type="submit" className="btn btn-primary btn-block mb-5">
          Register
        </button>

        <Link to="/signin" className="link">
          Already registered?
        </Link>
      </form>
    </>
  );
}

export default Register;
