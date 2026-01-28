import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Auth from "./Auth";
import ChatRoom from "./ChatRoom";

function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      {!user ? (
        <Auth setUser={setUser} />
      ) : (
        <Routes>
          <Route path="/" element={<ChatRoom user={user} />} />
          <Route path="/room/:roomId" element={<ChatRoom user={user} />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
