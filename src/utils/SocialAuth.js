import React from "react";
import "../styles/social.css";
import { FaFacebookF, FaGoogle, FaTwitter } from "react-icons/fa";
const SocialAuth = () => {
  return (
    <div>
      <div className="icons-box">
        {" "}
        <span className="icon social-button--facebook">
          <FaFacebookF />
        </span>
        <span className="icon social-button--google">
          <FaGoogle />
        </span>
        <span className="icon social-button--twitter">
          {" "}
          <FaTwitter />
        </span>{" "}
      </div>
    </div>
  );
};

export default SocialAuth;
