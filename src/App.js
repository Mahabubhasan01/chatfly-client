import { Route, Routes } from "react-router-dom";
import UserLogin from "./components/UserLogin";
import UserRegister from "./components/UserRegister";
import ChatRoom from "./components/ChatRoom";
import ChatApp from "./components/ChatApp";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ChatApp />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/chat" element={<ChatRoom />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </>
  );
}

export default App;
