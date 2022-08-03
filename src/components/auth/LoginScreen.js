import React from "react";

import { useMemo } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import {
  startGoogleSignIn,
  startLoginWithEmailPassword,
} from "../../store/auth/thunks";

const formData = {
  email: "",
  password: "",
};

export const LoginScreen = () => {
  const { status, errorMessage } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const { email, password, onInputChange } = useForm(formData);

  const isAuthenticating = useMemo(() => status === "checking", [status]);

  const onSubmit = (event) => {
    event.preventDefault();

    // console.log({ email, password })
    dispatch(startLoginWithEmailPassword({ email, password }));
  };

  const onGoogleSignIn = () => {
    console.log("onGoogleSignIn");
    dispatch(startGoogleSignIn());
  };

  return (
    <>
      <div className="auth__tittle-container">
        <h3 className="auth__tittle">Login</h3>
      </div>

      <form onSubmit={onSubmit}>
        {errorMessage && (
          <div className="auth__alert-error">{errorMessage}</div>
        )}

        <input
          type="text"
          placeholder="Email"
          name="email"
          className="auth__input"
          autoComplete="off"
          value={email}
          onChange={onInputChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="auth__input"
          value={password}
          onChange={onInputChange}
        />

        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={isAuthenticating}
        >
          Login
        </button>
        <div className="auth__social-networks">
          <p>Login with social networks</p>

          <div
            className="google-btn"
            onClick={onGoogleSignIn}
            disabled={isAuthenticating}
          >
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        </div>

        <Link to="/auth/register" className="link">
          Create New Account
        </Link>
      </form>
    </>
  );
};
