import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import "../assets/loginPageStyle.css";
import buildingImage from "./img/building.svg";
import appImage from "./img/app.svg";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";

function LoginPage() {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };

  const handleSignUpClick = () => {
    setIsSignUpMode(true);
  };

  const handleSignInClick = () => {
    setIsSignUpMode(false);
  };

  //Sign-up

  const [suFormData, setSuFormData] = useState({});
  const [suError, setSuError] = useState(false);
  const [suLoading, setSuLoading] = useState(false);
  const handleSuChange = (e) => {
    setSuFormData({ ...suFormData, [e.target.id]: e.target.value });
  };

  const handleSuSubmit = async (e) => {
    e.preventDefault(); //Prevents page from refreshing after submit
    try {
      setSuLoading(true);
      setSuError(false);
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(suFormData),
      });
      const data = await res.json();
      setSuLoading(false);
      if (data.success == false) {
        setSuError(true);
        return;
      }
      handleSignInClick();
    } catch (error) {
      setSuLoading(false);
      setSuError(true);
    }
  };

  return (
    <div className={`loginContainer ${isSignUpMode ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form onSubmit={handleSubmit} className="sign-in-form loginForm">
            <h2 className="title">Sign in</h2>

            <div className="input-field">
              <FontAwesomeIcon icon={faUser} className="my-auto mx-auto" />
              <input
                className="LoginInput"
                type="username"
                placeholder="Username"
                id="username"
                onChange={handleChange}
              />
            </div>
            <div className="input-field">
              <FontAwesomeIcon icon={faLock} className="my-auto mx-auto" />
              <input
                className="LoginInput"
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
              />
            </div>
            <button disabled={loading} className="btn">
              {loading ? "Loading..." : "Sign In"}
            </button>

            <p className="social-text loginp"> OR </p>
            <OAuth />
            <p className="text-red-700 mt-5">
              {error ? error.message || "Something went wrong!" : ""}
            </p>
          </form>

          {/* Sign-up */}

          <form onSubmit={handleSuSubmit} className="sign-up-form loginForm">
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <FontAwesomeIcon icon={faUser} className="my-auto mx-auto" />
              <input
                className="LoginInput"
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleSuChange}
              />
            </div>
            <div className="input-field">
              <FontAwesomeIcon icon={faEnvelope} className="my-auto mx-auto" />
              <input
                className="LoginInput"
                type="email"
                placeholder="Email"
                id="email"
                onChange={handleSuChange}
              />
            </div>
            <div className="input-field">
              <FontAwesomeIcon icon={faLock} className="my-auto mx-auto" />
              <input
                className="LoginInput"
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleSuChange}
              />
            </div>
            <button className="btn" disabled={suLoading}>
              {suLoading ? "Loading..." : "Sign up"}
            </button>
            <p className="social-text loginp"> OR </p>
            <OAuth />
          </form>
          <p className="text-red-700 mt-5">
            {suError && "Something went wrong!"}
          </p>
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3 className="loginh3">New user ?</h3>
            <p className="loginp">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <button className="btn transparent" onClick={handleSignUpClick}>
              Sign up
            </button>
          </div>
          <img src={appImage} class="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3 className="loginh3">Have an account ?</h3>
            <p className="loginp">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              laboriosam ad deleniti.
            </p>
            <button
              onClick={handleSignInClick}
              className="btn transparent"
              id="sign-in-btn"
            >
              Sign in
            </button>
          </div>
          <img src={buildingImage} class="image" alt="" />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
