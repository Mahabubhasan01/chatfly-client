import React, { useEffect, useState } from "react";

const ChatApp = () => {
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
  const handleMessageSubmit = () => {
    const message = { message: content }; // Update key to 'message'
    socket.send(JSON.stringify(message));
    console.log(message)
    setContent("");
  };

  return (
    <div>
      <h1>Real-time Chat</h1>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <p>{message}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleMessageSubmit}>
        <input
          type="text"
          placeholder="Your Message"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatApp;
