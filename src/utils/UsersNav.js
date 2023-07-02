import React, { useState } from "react";
import { Link } from "react-router-dom";
import useUsersApi from "../hooks/useUsersApi";

const UsersNav = () => {
  const [users] = useUsersApi();
  const [activeUser, setActiveUser] = useState(null);

  const handleUserClick = (userId) => {
    setActiveUser(userId);
  };

  return (
    <>
      {users?.map((user) => (
        <Link className="" to={`/chats/${user.Id}`} key={user.Id}>
          <div
            data-user-id={user.Id}
            key={user.Id}
            className={`msg ${user.is_active ? "online" : ""} ${
              activeUser === user.Id ? "active" : ""
            }`}
            onClick={() => handleUserClick(user.Id)}
          >
            <img className="msg-profile" src={user.image} alt="" />
            <div className="msg-detail">
              <div className="msg-username">{user.username}</div>
              <div className="msg-content">
                <span className="msg-message">What time was our meet</span>
                <span className="msg-date">20m</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};

export default UsersNav;
