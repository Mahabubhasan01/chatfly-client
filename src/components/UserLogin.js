import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/userlogin.css";
import SocialAuth from "../utils/SocialAuth";
const UserLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.status === 200) {
        // Login successful, perform desired action (e.g., redirect to protected page)
        console.log("Login successful");
      } else {
        // Login failed, display error message
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="body">
      <div class="login-page">
        <div class="form">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Login</button>
          </form>
          <p class="message">
            Not registered🤔? <Link to="/register">Create an account</Link>
          </p>
          <p class="message">
            Forgot your password? <Link to="/chat">Click here to reset</Link>
          </p>
          <h4 className="divider-box">
            <span className="or">Or</span>
          </h4>
          <div>
            <SocialAuth />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
