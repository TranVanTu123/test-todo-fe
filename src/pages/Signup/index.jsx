import React, { useCallback, useState } from "react";
import "./Signup.css";
import { useHistory } from "react-router-dom";

import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function Signup() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const hanleRegister = useCallback((e) => {
    e.preventDefault();
    axios
      .post("http://192.168.1.23:3000/user", {
        username: userName,
        password: password,
      })
      .then(function (response) {
        console.log(response);
        if (response.status === 201) {
          history.push("/login");
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
      <form className="form" id="form-1">
        <h3 className="heading">Registered members </h3>

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

        <div className="form-group">
          <label htmlFor="password_confirmation" className="form-label">
            Retype Password
          </label>
          <input
            id="password_confirmation"
            name="password_confirmation"
            type="password"
            className="form-control"
          />
          <span className="form-message"></span>
        </div>

        <button className="form-submit" onClick={hanleRegister}>
          Registered
        </button>
        <div className="form-text">
          <h3 className="text">Have an account? </h3>
          <Link className="form-link" to="/login">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
