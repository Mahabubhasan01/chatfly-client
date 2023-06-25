import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/userlogin.css";
import SocialAuth from "../utils/SocialAuth";
const UserRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // Perform any necessary actions after successful registration
      } else {
        console.error("Registration failed");
        // Handle registration error
      }
    } catch (error) {
      console.error(error);
      // Handle network error
    }
  };
  return (
    <div className="body">
      <div class="login-page">
        <div class="form">
          <h2>Register</h2>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Passwrord"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Register</button>
          </form>
          <p class="message">
            Already registered😉? <Link to="/">Login</Link>
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

export default UserRegister;
