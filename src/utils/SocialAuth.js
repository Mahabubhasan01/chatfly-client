import React from "react";
import "../styles/social.css";
import { FaFacebookF, FaGoogle, FaTwitter } from "react-icons/fa";
const SocialAuth = () => {
  return (
    <div>
      <div className="icons-box">
        {" "}
        <span className="icon">
          <FaFacebookF />
        </span>
        <span className="icon">
          <FaGoogle />
        </span>
        <span className="icon">
          {" "}
          <FaTwitter />
        </span>{" "}
      </div>
    </div>
  );
};

export default SocialAuth;
