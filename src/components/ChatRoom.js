import React, { useState, useEffect } from "react";
import "../styles/chatroom.css";
import io from "socket.io-client";

const ChatRoom = () => {
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
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    newSocket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    const message = { message: content };

    socket.send(JSON.stringify(message));

    const response = await fetch(
      "https://localhost:8000//api/save_chat_message/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: content }),
      }
    );

    const data = await response.json();
    if (data.success) {
      setContent("");
    } else {
      console.error(data.error);
    }
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
            <img
              class="msg-profile"
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%281%29.png"
              alt=""
            />
            <div class="msg-detail">
              <div class="msg-username">Madison Jones</div>
              {/* <div class="msg-content">
                  <span class="msg-message">What time was our meet</span>
                  <span class="msg-date">20m</span>
                </div> */}
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
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%281%29.png"
              alt=""
            />
          </div>
        </div>
        <div class="wrapper">
          <div class="conversation-area">
            <div class="msg online">
              <img
                class="msg-profile"
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%281%29.png"
                alt=""
              />
              <div class="msg-detail">
                <div class="msg-username">Madison Jones</div>
                <div class="msg-content">
                  <span class="msg-message">What time was our meet</span>
                  <span class="msg-date">20m</span>
                </div>
              </div>
            </div>

            <div class="msg active">
              <div class="msg-profile group">
                <svg
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="css-i6dzq1"
                >
                  <path d="M12 2l10 6.5v7L12 22 2 15.5v-7L12 2zM12 22v-6.5" />
                  <path d="M22 8.5l-10 7-10-7" />
                  <path d="M2 15.5l10-7 10 7M12 2v6.5" />
                </svg>
              </div>
              <div class="msg-detail">
                <div class="msg-username">CodePen Group</div>
                <div class="msg-content">
                  <span class="msg-message">Aysenur: I love CSS</span>
                  <span class="msg-date">28m</span>
                </div>
              </div>
            </div>

            <div class="msg">
              <img
                class="msg-profile"
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%286%29.png"
                alt=""
              />
              <div class="msg-detail">
                <div class="msg-username">Lina Ashma</div>
                <div class="msg-content">
                  <span class="msg-message">
                    Migas food truck crucifix vexi
                  </span>
                  <span class="msg-date">42m</span>
                </div>
              </div>
            </div>
            <button class="add"></button>
            <div class="overlay"></div>
          </div>
          <div class="chat-area">
            <div class="chat-area-header">
              <div class="chat-area-title">CodePen Group</div>
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
            </div>
            <div class="chat-area-main">
              <div class="chat-msg">
                <div class="chat-msg-profile">
                  <img
                    class="chat-msg-img"
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%283%29+%281%29.png"
                    alt=""
                  />
                  <div class="chat-msg-date">Message seen 1.22pm</div>
                </div>
                <div class="chat-msg-content">
                  <div class="chat-msg-text">
                    Luctus et ultrices posuere cubilia curae.
                  </div>
                  <div class="chat-msg-text">
                    <img src="https://media0.giphy.com/media/yYSSBtDgbbRzq/giphy.gif?cid=ecf05e47344fb5d835f832a976d1007c241548cc4eea4e7e&rid=giphy.gif" />
                  </div>
                  <div class="chat-msg-text">
                    Neque gravida in fermentum et sollicitudin ac orci phasellus
                    egestas. Pretium lectus quam id leo.
                  </div>
                </div>
              </div>
              <div class="chat-msg owner">
                <div class="chat-msg-profile">
                  <img
                    class="chat-msg-img"
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%281%29.png"
                    alt=""
                  />
                  <div class="chat-msg-date">Message seen 1.22pm</div>
                </div>
                <div class="chat-msg-content">
                  <div class="chat-msg-text">
                    Sit amet risus nullam eget felis eget. Dolor sed viverra
                    ipsum😂😂😂
                  </div>
                  <div class="chat-msg-text">
                    Cras mollis nec arcu malesuada tincidunt.
                  </div>
                </div>
              </div>
              <div class="chat-msg">
                <div class="chat-msg-profile">
                  <img
                    class="chat-msg-img"
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%282%29.png"
                    alt=""
                  />
                  <div class="chat-msg-date">Message seen 2.45pm</div>
                </div>
                <div class="chat-msg-content">
                  <div class="chat-msg-text">
                    Aenean tristique maximus tortor non tincidunt. Vestibulum
                    ante ipsum primis in faucibus orci luctus et ultrices
                    posuere cubilia curae😊
                  </div>
                  <div class="chat-msg-text">
                    Ut faucibus pulvinar elementum integer enim neque volutpat.
                  </div>
                </div>
              </div>
              <div class="chat-msg owner">
                <div class="chat-msg-profile">
                  <img
                    class="chat-msg-img"
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%281%29.png"
                    alt=""
                  />
                  <div class="chat-msg-date">Message seen 2.50pm</div>
                </div>
                <div class="chat-msg-content">
                  <div class="chat-msg-text">
                    posuere eget augue sodales, aliquet posuere eros.
                  </div>
                  <div class="chat-msg-text">
                    Cras mollis nec arcu malesuada tincidunt.
                  </div>
                </div>
              </div>
              <div class="chat-msg">
                <div class="chat-msg-profile">
                  <img
                    class="chat-msg-img"
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%2812%29.png"
                    alt=""
                  />
                  <div class="chat-msg-date">Message seen 3.16pm</div>
                </div>
                <div class="chat-msg-content">
                  <div class="chat-msg-text">
                    Egestas tellus rutrum tellus pellentesque
                  </div>
                </div>
              </div>
              <div class="chat-msg">
                <div class="chat-msg-profile">
                  <img
                    class="chat-msg-img account-profile"
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%283%29+%281%29.png"
                    alt=""
                  />
                  <div class="chat-msg-date">Message seen 3.16pm</div>
                </div>
                <div class="chat-msg-content">
                  <div class="chat-msg-text">
                    Consectetur adipiscing elit pellentesque habitant morbi
                    tristique senectus et.
                  </div>
                </div>
              </div>
              <div class="chat-msg owner">
                <div class="chat-msg-profile">
                  <img
                    class="chat-msg-img"
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%281%29.png"
                    alt=""
                  />
                  <div class="chat-msg-date">Message seen 2.50pm</div>
                </div>
                <div class="chat-msg-content">
                  <div class="chat-msg-text">Tincidunt arcu non sodales😂</div>
                </div>
              </div>
              <div class="chat-msg">
                <div class="chat-msg-profile">
                  <img
                    class="chat-msg-img"
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%282%29.png"
                    alt=""
                  />
                  <div class="chat-msg-date">Message seen 3.16pm</div>
                </div>
                <div class="chat-msg-content">
                  <div class="chat-msg-text">
                    Consectetur adipiscing elit pellentesque habitant morbi
                    tristique senectus et🥰
                  </div>
                </div>
              </div>
            </div>
            <form action="" onSubmit={handleMessageSubmit}>
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
          <div class="detail-area">
            <div class="detail-area-header">
              <div class="msg-profile group">
                <svg
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="css-i6dzq1"
                >
                  <path d="M12 2l10 6.5v7L12 22 2 15.5v-7L12 2zM12 22v-6.5" />
                  <path d="M22 8.5l-10 7-10-7" />
                  <path d="M2 15.5l10-7 10 7M12 2v6.5" />
                </svg>
              </div>
              <div class="detail-title">CodePen Group</div>
              <div class="detail-subtitle">Created by Aysenur, 1 May 2020</div>
              <div class="detail-buttons">
                <button class="detail-button">
                  <svg
                    viewbox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-width="0"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-phone"
                  >
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                  </svg>
                  Call Group
                </button>
                <button class="detail-button">
                  <svg
                    viewbox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-width="0"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-video"
                  >
                    <path d="M23 7l-7 5 7 5V7z" />
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                  </svg>
                  Video Chat
                </button>
              </div>
            </div>
            <div class="detail-changes">
              <input type="text" placeholder="Search in Conversation" />
              <div class="detail-change">
                Change Color
                <div class="colors">
                  <div class="color blue selected" data-color="blue"></div>
                  <div class="color purple" data-color="purple"></div>
                  <div class="color green" data-color="green"></div>
                  <div class="color orange" data-color="orange"></div>
                </div>
              </div>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
