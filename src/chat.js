import { useEffect, useState } from "react";
import { db } from "./firebase";

import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

function Chat({ roomId, user }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // Load messages of this room
  useEffect(() => {
    const q = query(
      collection(db, "rooms", roomId, "messages"),
      orderBy("time")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => doc.data()));
    });

    return () => unsubscribe();
  }, [roomId]);

  // Send message
  const sendMessage = async () => {
    if (message.trim() !== "") {
      await addDoc(collection(db, "rooms", roomId, "messages"), {
        text: message,
        sender: user.name,
        time: new Date().toISOString(),
      });

      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-full">

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto space-y-3 p-4 bg-gray-100">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-2xl max-w-xs ${
              msg.sender === user.email
                ? "ml-auto bg-green-200 text-right"
                : "mr-auto bg-white text-left"
            }`}
          >
            <p className="text-sm">{msg.text}</p>

            <span className="text-xs text-gray-500">
              {msg.sender}
            </span>
          </div>
        ))}
      </div>

      {/* Input Bar */}
      <div className="flex p-3 border-t bg-white">
        <input
          className="flex-1 border rounded-l-xl p-2 outline-none"
          value={message}
          placeholder="Type a message..."
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          className="bg-green-500 text-white px-6 rounded-r-xl font-semibold"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
