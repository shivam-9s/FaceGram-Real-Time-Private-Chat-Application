import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Auth from "./Auth";
import ChatRoom from "./ChatRoom";

import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

function App() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  // Load Firestore Profile after login
  useEffect(() => {
    const loadProfile = async () => {
      if (user) {
        const snap = await getDoc(doc(db, "users", user.uid));
        if (snap.exists()) {
          setProfile(snap.data());
        }
      }
    };

    loadProfile();
  }, [user]);

  return (
    <BrowserRouter>
      {!user ? (
        <Auth setUser={setUser} />
      ) : profile ? (
        <Routes>
          <Route path="/" element={<ChatRoom user={profile} />} />
          <Route path="/room/:roomId" element={<ChatRoom user={profile} />} />
        </Routes>
      ) : (
        <p className="text-center mt-20">Loading Profile...</p>
      )}
    </BrowserRouter>
  );
}

export default App;
