// src/components/SignIn.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import userIcon from "../Assets/person.png";
import passwordIcon from "../Assets/password.png";
import "./SignIn.css";
import { serverURL } from "../userService";

function SignIn() {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const Navigate = useNavigate();
  const handleSignIn = async function () {
    const data = {username: username, password:password };
    const res = await fetch(serverURL + "/api/tokens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.status === 200) {
      console.log("Sign in successful!");
      const tokenRes = await res.json();
      const token = tokenRes.token;
      sessionStorage.setItem("jwt", token);
      sessionStorage.setItem("username",username);
      Navigate("/FeedPage");
    } else if(res.status === 404) {
      console.log("Invalid username or Password. Please try again.");
      setErrorMessage("Invalid username or Password. Please try again.");
    }
  };

  const handleKeyPress = (e) => {
    // Check if the pressed key is "Enter"
    if (e.key === "Enter") {
      handleSignIn();
    }
  };

  return (
    <div id="signInBody">
      <div className="sign-in-container">
        <h1 className="header" id="pageHead">
          FOOBAR
        </h1>
        <div className="registration-card-container">
          <div className="registration-card" id="r-c">
            <div className="card-header">Sign In</div>
            <form id="signInForm" method="post" action="/api/tokens">
              {errorMessage && (
                <div className="error-message">{errorMessage}</div>
              )}
              <div className="input-wrapper">
                <input
                  type="text"
                  placeholder="User Name"
                  className="input-field"
                  value={username}
                  onChange={(e) => setusername(e.target.value)}
                />
                <img src={userIcon} alt="User Icon" className="input-icon" />
              </div>
              <br />
              <div className="input-wrapper">
                <input
                  type="password"
                  placeholder="Password"
                  className="input-field"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
                <img
                  src={passwordIcon}
                  alt="password Icon"
                  className="input-icon"
                />
              </div>
              <br />
              <div className="sign-up-sign-in">
                <button
                  type="button"
                  id="btt-st"
                  className="btn btn-primary btn-sm"
                  onClick={handleSignIn}
                >
                  Sign In
                </button>
                <text>Don't have an account yet? </text>
                <Link to="/SignUp">
                  <span className="click-here">click here</span>
                </Link>
                <text> to create one</text>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
