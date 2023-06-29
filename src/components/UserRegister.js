import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/userlogin.css";
import SocialAuth from "../utils/SocialAuth";
import toast, { Toaster } from "react-hot-toast";

const UserRegister = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  // Retrieving user information from local storage
  const storedUserInfo = localStorage.getItem("userInfo");
  const userInfo = JSON.parse(storedUserInfo);

  console.log(userInfo.username); // Output: exampleUser
  console.log(userInfo.email); // Output: user@example.com
  console.log(userInfo.role); // Output: admin

  const handleRegister = async (e) => {
    e.preventDefault();
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
        body: JSON.stringify(formData),
      });

      if (response) {
        const data = await response.json();
        toast.success("Successfully registered");
        // Setting user information in local storage
        const userInfo = {
          username: username,
          email: email,
        };
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        navigate("/chat");

        console.log(data);
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
              type="text"
              placeholder="Fullname"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
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
    </div>
  );
};

export default UserRegister;
