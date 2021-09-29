import React, { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { Link } from "react-router-dom";
import { login, logout } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  EuiFieldText,
  EuiFieldPassword,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiTitle,
  EuiFormRow,
  EuiButton,
  EuiLink,
  EuiSpacer,
} from "@elastic/eui";

const Login = () => {
  const dispatch = useDispatch();
  const [dual, setDual] = useState(true);
  const [formValues, handleInputChange] = useForm();

  const { email, password } = formValues;

  const submit = (e) => {
    e.preventDefault();

    dispatch(login(email, password));
  };

  return (
    <>
      <EuiSpacer />
      <EuiFlexGroup justifyContent="center">
        <EuiFlexItem style={{ minWidth: 400 }} grow={false}>
          <EuiPanel>
            <EuiTitle size="l" style={{ textAlign: "center" }}>
              <h1>SignIn</h1>
            </EuiTitle>
            <EuiSpacer />
            <form onSubmit={submit}>
              <EuiFormRow label="Email">
                <EuiFieldText
                  placeholder="Email"
                  value={email}
                  onChange={handleInputChange}
                  aria-label="Email"
                  name="email"
                />
              </EuiFormRow>
              <EuiSpacer />
              <EuiFormRow label="Password">
                <EuiFieldPassword
                  placeholder="Password"
                  type={dual ? "dual" : undefined}
                  value={password}
                  onChange={handleInputChange}
                  aria-label="Password"
                  name="password"
                />
              </EuiFormRow>
              <EuiSpacer />
              <EuiFormRow fullWidth>
                <EuiButton type="submit" fill fullWidth>
                  Save
                </EuiButton>
              </EuiFormRow>
              <EuiSpacer />
              <EuiFlexItem grow={false}>
                <EuiLink href="/auth/signup" style={{ textAlign: "center" }}>
                  Signup
                </EuiLink>
              </EuiFlexItem>
            </form>
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  );
};

export default Login;
