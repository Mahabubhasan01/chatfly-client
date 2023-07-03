import React, { useState } from "react";
import "../styles/userprofile.css";
function UserProfile() {
  const [showModal, setShowModal] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const shareLink = "example.com/share-link";

  const handleViewModal = () => {
    setShowModal(!showModal);
  };

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(shareLink)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 3000);
      })
      .catch((error) => {
        console.log("Copy failed:", error);
      });
  };

  return (
    <div>
      <button className="view-modal" onClick={handleViewModal}>
        Profile
      </button>
      {showModal && (
        <div className="popup show">
          <header>
            <span>Share Modal</span>
            <div className="close" onClick={handleViewModal}>
              <i className="uil uil-times"></i>
            </div>
          </header>
          <div className="content">
            <p>Share this link via</p>
            <ul className="icons">
              <a href="#">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#">
                <i className="fab fa-whatsapp"></i>
              </a>
              <a href="#">
                <i className="fab fa-telegram-plane"></i>
              </a>
            </ul>
            <p>Or copy link</p>
            <div className={`field ${isCopied ? "active" : ""}`}>
              <i className="url-icon uil uil-link"></i>
              <input type="text" readOnly value={shareLink} />
              <button onClick={handleCopyLink}>
                {isCopied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
