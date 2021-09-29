import React, { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { register } from "../../actions/auth";
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
  EuiSpacer
} from "@elastic/eui";

const Register = () => {
  const dispatch = useDispatch();
  const [formValues, handleInputChange] = useForm();
  const [dual, setDual] = useState(true);

  const { email, password, password2 } = formValues;

  const submit = (e) => {
    e.preventDefault();

    if (password === password2) {
      dispatch(register(email, password));
    }
  };

  return (
    <>
      <EuiSpacer />
      <EuiFlexGroup justifyContent="center">
        <EuiFlexItem style={{ minWidth: 400 }} grow={false}>
          <EuiPanel>
            <EuiTitle size="l" style={{ textAlign: "center" }}>
              <h1>SignUp</h1>
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
              <EuiFormRow label="Confirm Password">
                <EuiFieldPassword
                  placeholder="Confirm Password"
                  type={dual ? "dual" : undefined}
                  value={password2}
                  onChange={handleInputChange}
                  aria-label="Password"
                  name="password2"
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
                <EuiLink href="/auth/signin" style={{ textAlign: "center" }}>
                  SignIn
                </EuiLink>
              </EuiFlexItem>
            </form>
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  );
};

export default Register;
