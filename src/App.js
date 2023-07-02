import { Route, Routes } from "react-router-dom";
import UserLogin from "./components/UserLogin";
import UserRegister from "./components/UserRegister";
import ChatRoom from "./components/ChatRoom";
import ChatMessages from "./utils/ChatMessages";
import { Toaster } from "react-hot-toast";
import UsersChatMessages from "./components/UsersChatMessages";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/chat" element={<ChatRoom />} />

        <Route path="/chats/:Id" element={<UsersChatMessages />} />
        
        {/* <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} /> */}
      </Routes>
      <Toaster position="top-right" reverseOrder={true} />
    </>
  );
}

export default App;
