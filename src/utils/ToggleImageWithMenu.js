import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/ToggleImageWithMenu.css";
const ToggleImageWithMenu = ({ userDetail }) => {
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
              <Link href="#">Profile</Link>
            </li>
            <li class="drop-menu-item">
              <Link href="#">Settings</Link>
            </li>
            <li class="drop-menu-item">
              <Link href="#">Logout</Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default ToggleImageWithMenu;
