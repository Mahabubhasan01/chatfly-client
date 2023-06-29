import React, { useEffect, useState } from "react";

const ChatMessages = ({ message, messages, Id }) => {
  const [data, setData] = useState([]);
  const [senderData, setSenderData] = useState([]);
  const [reciverData, setReciverData] = useState([]);

  useEffect(() => {
    // Fetch data based on the dynamicParam
    fetchData(Id);
  }, [Id]);

  const fetchData = async (param) => {
    try {
      // Make an HTTP request to fetch data based on the param
      const response = await fetch(`http://127.0.0.1:8000/api/users/`);
      const data = await response.json();
      console.log(data, "opsssssssssssss");
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
        const receiver = jsonData.filter(
          (item) => item.sender === "52a0e2fe-1766-47d1-ad9e-858653cea1c2"
        );
        console.log(receiver, "r");
        setReciverData(receiver);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  /* =================== */
  const image = data?.image;
  return (
    <div class="chat-area-main">
      <div>
        {reciverData?.map((r) => (
          <div class="chat-msg">
            <div class="chat-msg-profile">
              <img class="chat-msg-img" src={image} alt="" />
              <div class="chat-msg-date">Message seen 1.22pm</div>
            </div>
            <div class="chat-msg-content">
              <div class="chat-msg-text">{/* <img src={image} /> */}</div>
              <div class="chat-msg-text">{r.content}</div>
            </div>
          </div>
        ))}
      </div>
      <div>
        {senderData?.map((s) => (
          <div className="chat-msg owner" key={s.id}>
            <div className="chat-msg-profile">
              <img className="chat-msg-img" src={image} alt="" />
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
              <img className="chat-msg-img" src={image} alt="" />
              <div className="chat-msg-date">{data.timestamp}</div>
            </div>
            <div className="chat-msg-content">
              <div className="chat-msg-text">{data.message}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatMessages;
