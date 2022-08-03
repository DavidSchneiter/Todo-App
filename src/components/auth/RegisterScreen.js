import React from "react";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks";

const formData = {
  email: "",
  password: "",
  displayName: "",
};

const formValidations = {
  email: [(value) => value.includes("@"), "El correo debe de tener una @"],
  password: [
    (value) => value.length >= 6,
    "El password debe de tener más de 6 letras.",
  ],
  displayName: [(value) => value.length >= 1, "El nombre es obligatorio."],
};

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { status, errorMessage } = useSelector((state) => state.auth);
  const isCheckingAuthentication = useMemo(
    () => status === "checking",
    [status]
  );

  const {
    formState,
    displayName,
    email,
    password,
    onInputChange,
    isFormValid,
    displayNameValid,
    emailValid,
    passwordValid,
  } = useForm(formData, formValidations);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (!isFormValid) return;

    dispatch(startCreatingUserWithEmailPassword(formState));
  };

  return (
    <>
      <div className="auth__tittle-container">
        <h3 className="auth__tittle">Register</h3>
      </div>

      <form onSubmit={onSubmit}>
        {errorMessage && (
          <div className="auth__alert-error">{errorMessage}</div>
        )}

        <input
          label="Nombre completo"
          type="text"
          placeholder="Name"
          name="displayName"
          className="auth__input"
          value={displayName}
          onChange={onInputChange}
          error={!!displayNameValid && formSubmitted}
          helperText={displayNameValid}
        />
        <input
          label="Correo"
          type="email"
          placeholder="email@email.com"
          name="email"
          className="auth__input"
          value={email}
          onChange={onInputChange}
          error={!!emailValid && formSubmitted}
          helperText={emailValid}
        />
        <input
          label="Contraseña"
          type="password"
          placeholder="Password"
          name="password"
          className="auth__input"
          value={password}
          onChange={onInputChange}
          error={!!passwordValid && formSubmitted}
          helperText={passwordValid}
        />
        {/* <input
                type="password"
                placeholder="Confirm Password"
                name="password2" 
                className="auth__input"
                value={password2}
                onChange={handleInputChange}
            /> */}

        <button
          type="submit"
          className="btn btn-primary btn-block mb-5"
          onClick={isCheckingAuthentication}
        >
          Register
        </button>

        <Link to="/auth/login" className="link">
          Already registered?
        </Link>
      </form>
    </>
  );
};
