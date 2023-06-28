import React, { useState } from "react";
import { Link, Navigate, redirect } from "react-router-dom";
import "../styles/userlogin.css";
import SocialAuth from "../utils/SocialAuth";
import toast, { Toaster } from "react-hot-toast";

const UserRegister = () => {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(
    "https://i.ibb.co/C1RsDzn/Whats-App-Image-2023-06-05-at-18-27-57.jpg"
  );
  const [confirmpassword, setConfirmPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    // Create a new FormData object to send the data
    const formData = {
      username: username,
      email: email,
      full_name: fullname,
      password: password,
    };
    if (password !== confirmpassword) {
      toast.error("Your password doesn't match");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Convert formData to JSON
      });

      if (response) {
        const data = await response.json();
        toast.success("Successfully registered");
        console.log(data);
        redirect('/chat')
        // Perform any necessary actions after successful registration
      } else {
        console.log(response);
        toast.error("Registration failed");
        // Handle registration error
      }
    } catch (error) {
      console.error(error);
      // Handle network error
    }
  };

  return (
    <div className="body">
      <div className="login-page">
        <div className="form">
          <h2>Register</h2>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="submit">Register</button>
          </form>
          <p className="message">
            Already registered? <Link to="/">Login</Link>
          </p>
          <h4 className="divider-box">
            <span className="or">Or</span>
          </h4>
          <div>
            <SocialAuth />
          </div>
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={true} />
    </div>
  );
};

export default UserRegister;
