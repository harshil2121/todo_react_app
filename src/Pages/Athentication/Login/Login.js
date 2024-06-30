import React, { useEffect, useState } from "react";
import { Eye, EyeOff } from "react-feather";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { compose } from "redux";
import { checkApi, loginApi } from "../../../apiService/authServices";
import authActions from "../../../Redux/auth/actions";
import navigationAction from "../../../Redux/navigation/actions";
import formikEnhancer from "./enhancer/loginEnhancer";

const { login, check } = authActions;
const { success, error, fetching } = navigationAction;

const Login = (props) => {
  const navigate = useNavigate();
  const {
    token,
    values,
    handleBlur,
    handleChange,
    submitCount,
    touched,
    errors,
  } = props;
  const [pwdView, togglePwdView] = useState(false);

  const Error = ({ field }) => {
    const errorMessage = errors[field] &&
      (touched[field] || submitCount > 0) && (
        <span className={props.className ? props.className : "error-msg"}>
          {errors[field]}
        </span>
      );
    return errorMessage || null;
  };

  const checkLogin = async () => {
    fetching();
    await checkApi(token).then((res) => {
      if (res.success) {
        check(res.data);
        navigate("/todo");
      } else {
        error(res.error);
      }
    });
  };

  useEffect(() => {
    if (token !== null) {
      checkLogin();
    }
    // eslint-disable-next-line
  }, [token]);

  const handleLogin = async (e) => {
    e.preventDefault();
    await loginApi(values)
      .then((res) => {
        if (res.success) {
          props.login(res.data);
          navigate("/todo");
          success(res.message);
        } else {
          error(res.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="login-signin-main">
      <div className="login-container">
        <h2>Welcome Back!</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Username:</label>
            <input
              type="text"
              name="identifier"
              placeholder="Enter your email or username"
              value={values.identifier}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Error field="identifier" />
          </div>
          <div className="input-group password-input-container">
            <label>Password:</label>
            <input
              // className="toggle-pass-input"
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
            <Error field="password" />
          </div>
          <div className="input-group">
            <button type="submit">Login</button>
          </div>
          <div className="text-center mt-3">
            Don't have an account? <Link to="/register">Sign Up</Link>.
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  token: state.auth.accessToken,
  isFetching: state.navigation.isFetching,
});

export default compose(
  formikEnhancer,
  connect(mapStateToProps, {
    check,
    login,
    success,
    error,
    fetching,
  })
)(Login);
