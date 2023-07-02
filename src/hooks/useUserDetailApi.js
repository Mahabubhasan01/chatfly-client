import { useEffect, useState } from "react";

const useUserDetailApi = (Id) => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const url = `http://127.0.0.1:8000/api/users/${Id}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [Id]); // Empty dependency array to run effect only once on mount

  return [user];
};

export default useUserDetailApi;
