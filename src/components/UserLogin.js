import React from "react";
import { Link } from "react-router-dom";
import "../styles/userlogin.css";
import SocialAuth from "../utils/SocialAuth";
const UserLogin = () => {
  return (
    <div className="body">
      <div class="login-page">
        <div class="form">
          <h2>Login</h2>
          <form>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button>Log in</button>
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
