import React, { useCallback, useState } from "react";
//import "./Login.css";

import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const handleLogin = useCallback((e) => {
    e.preventDefault();

    axios
      .post("http://192.168.1.23:3000/user/sign-in", {
        username: userName,
        password: password,
      })
      .then(function (response) {
        //console.log(response);
        if (response.status === 201) {
          window.localStorage.setItem("asstoken", response.data.accessToken);
          history.push("/home");
        } else {
          console.log("Tai khoan khong dung");
        }
      })

      .catch(function (error) {
        console.log(error);
      });
  });
  return (
    <div className="main">
      <form action="" method="POST" className="form" id="form-1">
        <h3 className="heading">Welcome to BunBu </h3>

        <div className="spacer"></div>

        <div className="form-group">
          <label htmlFor="fullname" className="form-label">
            User Name
          </label>
          <input
            id="fullname"
            name="fullname"
            type="text"
            onChange={(e) => setUserName(e.target.value)}
            className="form-control"
          />
          <span className="form-message"></span>
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">
            PassWord
          </label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
          />
          <span className="form-message"></span>
        </div>

        <button className="form-submit" onClick={handleLogin}>
          Login
        </button>
        <div className="form-text">
          <p className="text">Don't have an account?</p>
          <Link className="form-link" to="/">
            Signup
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
