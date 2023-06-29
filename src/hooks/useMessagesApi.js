import { useEffect, useState } from "react";

const useMessagesApi = (url) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, []); // Empty dependency array to run effect only once on mount

  return [messages];
};

export default useMessagesApi;
