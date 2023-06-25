import { useEffect, useState } from "react";

const useMessagesApi = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const url = "http://127.0.0.1:8000/api/";

    fetch(url)
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, []); // Empty dependency array to run effect only once on mount

  return [messages];
};

export default useMessagesApi;
