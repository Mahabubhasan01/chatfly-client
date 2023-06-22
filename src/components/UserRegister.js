import React from "react";
import { Link } from "react-router-dom";
import "../styles/userlogin.css";
const UserRegister = () => {
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
            <input type="text" placeholder="First name" />
            <input type="text" placeholder="Last name" />
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Confirm Password" />
            <button>Log in</button>
          </form>
          <p class="message">
            Already registered? <Link to="/">Login😉</Link>
          </p>
          <h4><span>Or</span></h4>
          <div className="d-flex justify-between items-center">
            <div>Google</div>
            <div>Facebook</div>
            <div>Twitter</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
