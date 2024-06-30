import { BrowserRouter, Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import Login from "./Pages/Athentication/Login/Login";
import SignupForm from "./Pages/Athentication/SignupForm/Signup";
import Task from "./Pages/Task/Task";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "./assests/css/main.css";

function App(props) {
  const { token } = props;
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<SignupForm />} />
          {token ? (
            <>
              <Route path="/todo" element={<Task />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Login />} />
            </>
          )}
        </Routes>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </BrowserRouter>
    </>
  );
}

const mapStateToProps = (state) => {
  console.log("state", state);
  return {
    token: state.auth.accessToken,
    user: state.auth?.user?.user,
  };
};

export default compose(connect(mapStateToProps))(App);
