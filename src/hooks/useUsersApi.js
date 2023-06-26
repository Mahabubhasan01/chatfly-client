import { useEffect, useState } from "react";

const useUsersApi = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const url = "http://127.0.0.1:8000/api/users";

    fetch(url)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []); // Empty dependency array to run effect only once on mount

  return [users];
};

export default useUsersApi;
