import React, { useState } from "react";
import enhancer from "./enhancer/signupEnhancer";
import { compose } from "redux";
import { Eye, EyeOff } from "react-feather";
import { Link, useNavigate } from "react-router-dom";
import { loginApi, register } from "../../../apiService/authServices";
import navigationActions from "../../../Redux/navigation/actions";
import authActions from "../../../Redux/auth/actions";
import { connect } from "react-redux";

const { success, error, fetching } = navigationActions;
const { login } = authActions;

const SignupForm = (props) => {
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    isValid,
    touched,
    submitCount,
  } = props;
  const navigate = useNavigate();
  const [pwdView, togglePwdView] = useState(false);
  const [pwdView1, togglePwdView1] = useState(false);

  const ErrorMessage = ({ field }) => {
    return (
      <div style={{ marginTop: "5px" }}>
        {(errors[field] && touched[field]) || submitCount > 0 ? (
          <span className="error-msg">{errors[field]}</span>
        ) : null}
      </div>
    );
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    handleSubmit();
    if (isValid) {
      const data = {
        first_name: values.firstName,
        last_name: values.lastName,
        username: values.username,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      };

      await register(data)
        .then(async (res) => {
          if (res.success) {
            await loginApi({
              identifier: values.email,
              password: values.password,
            })
              .then((resss) => {
                props.login(resss.data);
                navigate("/todo");
                success(res.message);
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="signin-continer">
      <div className="login-signin-main">
        <div className="login-container">
          <h2>Sign Up</h2>
          <form onSubmit={handleRegister}>
            <div className="input-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Enter your username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage field="username" />
            </div>

            <div className="input-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage field="email" />
            </div>

            <div className="input-group">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter your first name"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage field="firstName" />
            </div>

            <div className="input-group">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter your last name"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage field="lastName" />
            </div>

            <div className="input-group password-input-container">
              <label htmlFor="password">Password:</label>
              <input
                className="toggle-pass-input"
                type={pwdView ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Enter your password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span
                className="toggle-password-btn"
                onClick={() => togglePwdView(!pwdView)}
              >
                {pwdView ? (
                  <EyeOff className="sm-svg" />
                ) : (
                  <Eye className="sm-svg" />
                )}
              </span>
              <ErrorMessage field="password" />
            </div>

            <div className="input-group password-input-container">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                className="toggle-pass-input"
                type={pwdView1 ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm your password"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span
                className="toggle-password-btn"
                onClick={() => togglePwdView1(!pwdView1)}
              >
                {pwdView1 ? (
                  <EyeOff className="sm-svg" />
                ) : (
                  <Eye className="sm-svg" />
                )}
              </span>
              <ErrorMessage field="confirmPassword" />
            </div>

            <button type="submit" disabled={!isValid}>
              Sign Up
            </button>
            <div className="text-center mt-3">
              Already have an account? <Link to="/">Log In</Link>.
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isFetching: state.navigation.isFetching,
  };
};

export default compose(
  enhancer,
  connect(mapStateToProps, { login, success, error, fetching })
)(SignupForm);
