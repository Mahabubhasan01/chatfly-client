import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/ToggleImageWithMenu.css";
import { useNavigate } from "react-router-dom";
import UserProfile from "../components/UserProfile";

const ToggleImageWithMenu = ({ userDetail }) => {
  const history = useNavigate();
  const handleLogout = () => {
    
    // Perform logout actions here
    // e.g., clear session data, remove tokens from local storage

    // Redirect to the login page
    history("/");
  };
  return (
    <div class="menu-wrap">
      <ul class="menu">
        <li class="menu-item">
          <img
            class="user-profile account-profile"
            src={userDetail?.image}
            alt=""
          />
          <ul class="drop-menu">
            <li class="drop-menu-item">
              <Link href="#"><UserProfile/></Link>
            </li>
            <li class="drop-menu-item">
              <Link href="#">Settings</Link>
            </li>
            <li class="drop-menu-item">
              <Link onClick={handleLogout}>Logout</Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default ToggleImageWithMenu;
