import React, { useEffect, useState } from "react";
import useUsersApi from "../hooks/useUsersApi";
import Loadding from "./Loadding";
import { useParams } from "react-router-dom";
const ChatMessages = ({ messages ,Id}) => {
  const { id } = useParams();
  const [senderData, setSenderData] = useState([]);
  const [reciverData, setReciverData] = useState([]);
  const [users] = useUsersApi();
  const storedUserInfo = localStorage.getItem("userInfo");
  const userInfo = JSON.parse(storedUserInfo);
  const usernames = userInfo.username;
  const induser = users?.filter((us) => us.username === usernames);
  const userDetail = induser[0];
  /* =================== */

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/chat");
        const jsonData = await response.json();
        const sender = jsonData.filter(
          (item) => item.sender === "19feb270-b9b4-42d6-a20b-6d1771e27c69"
        );
        console.log(sender, "s");
        setSenderData(sender);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/chat");
        const jsonData = await response.json();
        const receiver = jsonData.filter((item) => item.sender === Id);
        console.log(receiver, "r");
        setReciverData(receiver);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [Id]);

  /* =================== */
  return (
    <>
      <div className="chat-area-main">
        {induser ? (
          <div class="chat-area-main">
            <div>
              {reciverData?.map((r) => (
                <div class="chat-msg" key={r.id}>
                  <div class="chat-msg-profile">
                    {r.image ? (
                      <img
                        class="chat-msg-img"
                        src={userDetail?.image}
                        alt=""
                      />
                    ) : (
                      ""
                    )}
                    <div class="chat-msg-date">Message seen 1.22pm</div>
                  </div>
                  <div class="chat-msg-content">
                    <div class="chat-msg-text">{r.content}</div>
                  </div>
                </div>
              ))}
            </div>
            <div>
              {senderData?.map((s) => (
                <div className="chat-msg owner" key={s.id}>
                  <div className="chat-msg-profile">
                    <img
                      className="chat-msg-img"
                      src={userDetail?.image}
                      alt=""
                    />
                    <div className="chat-msg-date">{s.timestamp}</div>
                  </div>
                  <div className="chat-msg-content">
                    <div className="chat-msg-text">{s.content}</div>
                  </div>
                </div>
              ))}
            </div>
            <div>
              {messages?.map((data) => (
                <div className="chat-msg owner" key={data.id}>
                  <div className="chat-msg-profile">
                    <img
                      className="chat-msg-img"
                      src={userDetail?.image}
                      alt=""
                    />
                    <div className="chat-msg-date">{data.timestamp}</div>
                  </div>
                  <div className="chat-msg-content">
                    <div className="chat-msg-text">{data.message}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <Loadding />
        )}
      </div>
    </>
  );
};

export default ChatMessages;
