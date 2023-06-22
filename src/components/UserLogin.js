import React from "react";
import { Link } from "react-router-dom";
import "../styles/userlogin.css";
const UserLogin = () => {
  return (
    <div className="body">
      <div class="login-page">
        <div class="avatar">
          <img
            src="https://cdn.pixabay.com/photo/2014/04/02/14/10/female-306407_960_720.png"
            alt="Avatar"
          />
        </div>
        <div class="form">
          <h2>Login</h2>
          <form>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button>Log in</button>
          </form>
          <p class="message">
            Not registered? <Link to="/register">Create an account</Link>
          </p>
          <p class="message">
            Forgot your password? <Link to="/chat">Click here to reset it</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
