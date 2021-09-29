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
    <EuiFlexGroup justifyContent="center" style={{marginTop: "48px"}}>
      <EuiFlexItem style={{ minWidth: 400 }} grow={false}>
        <EuiPanel>
          <EuiTitle
            size="l"
            style={{ textAlign: "center", marginBottom: "24px" }}
          >
            <h1>SignUp</h1>
          </EuiTitle>

          <form onSubmit={submit}>
            <EuiFormRow label="Email" style={{ marginBottom: "24px" }}>
              <EuiFieldText
                placeholder="Email"
                value={email}
                onChange={handleInputChange}
                aria-label="Email"
                name="email"
              />
            </EuiFormRow>

            <EuiFormRow label="Password" style={{ marginBottom: "24px" }}>
              <EuiFieldPassword
                placeholder="Password"
                type={dual ? "dual" : undefined}
                value={password}
                onChange={handleInputChange}
                aria-label="Password"
                name="password"
              />
            </EuiFormRow>
            <EuiFormRow
              label="Confirm Password"
              style={{ marginBottom: "24px" }}
            >
              <EuiFieldPassword
                placeholder="Confirm Password"
                type={dual ? "dual" : undefined}
                value={password2}
                onChange={handleInputChange}
                aria-label="Password"
                name="password2"
              />
            </EuiFormRow>
            <EuiFormRow fullWidth style={{ marginBottom: "24px" }}>
              <EuiButton type="submit" fill fullWidth>
                Save
              </EuiButton>
            </EuiFormRow>


            <EuiFlexItem grow={false}>
              <EuiLink href="/auth/signin" style={{ textAlign: "center" }}>
                SignIn
              </EuiLink>
            </EuiFlexItem>
          </form>
        </EuiPanel>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};

export default Register;
