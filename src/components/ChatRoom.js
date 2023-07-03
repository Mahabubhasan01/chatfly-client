import React, { useState, useEffect } from "react";
import useMessagesApi from "../hooks/useMessagesApi";
import useUsersApi from "../hooks/useUsersApi";
import "../styles/chatroom.css";
import NestedNav from "../utils/NestedNav";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { IoMdCall } from "react-icons/io";
import ChatMessages from "../utils/ChatMessages";
import CreateGroup from "../utils/CreatGroup";
import UsersNav from "../utils/UsersNav";
import { useParams } from "react-router-dom";
const ChatRoom = () => {
  const { id } = useParams();
  const url = "http://127.0.0.1:8000/api/";
  const [users] = useUsersApi();
  const storedUserInfo = localStorage.getItem("userInfo");
  const userInfo = JSON.parse(storedUserInfo);
  const usernames = userInfo?.username;
  const [message] = useMessagesApi(url);
  const induser = users?.filter((us) => us.username === usernames);
  const userDetail = induser[0];
  // Retrieving user information from local storage

  const [selectedColor, setSelectedColor] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:8000/ws/chat/"); // Replace with your server URL

    newSocket.onopen = () => {
      console.log("WebSocket connection established");
    };

    newSocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    newSocket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    setSocket((prevSocket) => {
      if (prevSocket) {
        prevSocket.close();
      }
      return newSocket;
    });

    return () => {
      newSocket.close();
    };
  }, []);
  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    const message = { message: content };
    const receiver_id = { receiver: "19feb270-b9b4-42d6-a20b-6d1771e27c69" };
    const data = { ...message, ...receiver_id };

    socket.send(JSON.stringify(data));
    setContent("");
  };

  useEffect(() => {
    const colors = document.querySelectorAll(".color");
    const toggleButton = document.querySelector(".dark-light");

    const handleClick = (e) => {
      colors.forEach((c) => c.classList.remove("selected"));
      const theme = e.target.getAttribute("data-color");
      document.body.setAttribute("data-theme", theme);
      e.target.classList.add("selected");
      setSelectedColor(theme);
    };

    const handleToggle = () => {
      document.body.classList.toggle("dark-mode");
      setDarkMode((prevDarkMode) => !prevDarkMode);
    };

    colors.forEach((color) => {
      color.addEventListener("click", handleClick);
    });

    toggleButton.addEventListener("click", handleToggle);

    return () => {
      colors.forEach((color) => {
        color.removeEventListener("click", handleClick);
      });

      toggleButton.removeEventListener("click", handleToggle);
    };
  }, []);
  return (
    <div>
      <div class="app">
        <div class="header">
          <div class="msg online">
            <img class="msg-profile" src={userDetail?.image} alt="" />
            <div class="msg-detail">
              <div class="msg-username">{userDetail?.full_name}</div>
            </div>
          </div>
          <div class="search-bar">
            <input type="text" placeholder="Search..." />
          </div>
          <div class="user-settings">
            <div class="dark-light">
              <svg
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1.5"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            </div>
            <div class="settings">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
              </svg>
            </div>
            <img
              class="user-profile account-profile"
              src={userDetail?.image}
              alt=""
            />
          </div>
        </div>
        <div class="wrapper">
          <div class="conversation-area">
            <UsersNav />
            {/* <div class="msg">
              <img class="msg-profile" src={userDetail?.image} alt="" />
              <div class="msg-detail">
                <div class="msg-username">Lina Ashma</div>
                <div class="msg-content">
                  <span class="msg-message">
                    Migas food truck crucifix vexi
                  </span>
                  <span class="msg-date">42m</span>
                </div>
              </div>
            </div> */}

            <CreateGroup />
          </div>
          <div class="chat-area">
            <div class="chat-area-header">
              <div class="chat-area-group">
                <img
                  class="chat-area-profile"
                  src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%283%29+%281%29.png"
                  alt=""
                />
                <img
                  class="chat-area-profile"
                  src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%282%29.png"
                  alt=""
                />
                <img
                  class="chat-area-profile"
                  src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%2812%29.png"
                  alt=""
                />
                <span>+4</span>
              </div>
              <div class="chat-area-title">
                {" "}
                <span>
                  <BsFillCameraVideoFill />
                </span>
                <span>
                  <IoMdCall />
                </span>{" "}
              </div>
            </div>
            {/* Chat area here to start */}
            <ChatMessages Id={id} message={message} messages={messages} />
            {/* Chat are stop here */}
            <form
              className="form-input"
              action=""
              onSubmit={handleMessageSubmit}
            >
              <div class="chat-area-footer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-video"
                >
                  <path d="M23 7l-7 5 7 5V7z" />
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-image"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-plus-circle"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v8M8 12h8" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-paperclip"
                >
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
                </svg>
                <input
                  type="text"
                  placeholder="Your Message"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-smile"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-thumbs-up"
                >
                  <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />
                </svg>
              </div>
            </form>
          </div>
          {/* <div class="detail-area">
            <div class="detail-area-header">
              <div class="msg-profile group">
                <img
                  class="chat-msg-img"
                  src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%283%29+%281%29.png"
                  alt=""
                />
              </div>
              <div class="detail-title">CodePen Group</div>
              <div class="detail-subtitle">Active 19min ago</div>
            </div>
            <NestedNav />
            <div class="detail-changes">
              <input type="text" placeholder="Search in Conversation" />

              <div class="detail-change">
                Change Emoji
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewbox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-thumbs-up"
                >
                  <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />
                </svg>
              </div>
            </div>
            <div class="detail-photos">
              <div class="detail-photo-title">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewbox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-image"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
                Shared photos
              </div>
              <div class="detail-photo-grid">
                <img src="https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2168&q=80" />
                <img src="https://images.unsplash.com/photo-1516085216930-c93a002a8b01?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80" />
                <img src="https://images.unsplash.com/photo-1458819714733-e5ab3d536722?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=933&q=80" />
                <img src="https://images.unsplash.com/photo-1520013817300-1f4c1cb245ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2287&q=80" />
                <img src="https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2247&q=80" />
                <img src="https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1300&q=80" />
                <img src="https://images.unsplash.com/photo-1560393464-5c69a73c5770?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1301&q=80" />
                <img src="https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2249&q=80" />
                <img src="https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2309&q=80" />

                <img src="https://images.unsplash.com/photo-1473170611423-22489201d919?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2251&q=80" />
                <img src="https://images.unsplash.com/photo-1579613832111-ac7dfcc7723f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80" />
                <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2189&q=80" />
              </div>
              <div class="view-more">View More</div>
            </div>
            <a
              href="https://twitter.com/AysnrTrkk"
              class="follow-me"
              target="_blank"
            >
              <span class="follow-text">
                <svg
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="css-i6dzq1"
                >
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
                Follow me on Twitter
              </span>
              <span class="developer">
                <img src="https://pbs.twimg.com/profile_images/1253782473953157124/x56UURmt_400x400.jpg" />
                Aysenur Turk — @AysnrTrkk
              </span>
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
