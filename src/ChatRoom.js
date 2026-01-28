import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import FaceGramLayout from "./components/FaceGramLayout";

function ChatRoom({ user }) {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const [newRoom, setNewRoom] = useState("");

  // Create new room
  const createRoom = () => {
    const id = Math.random().toString(36).substring(2, 8);
    navigate(`/room/${id}`);
  };

  // Join existing room
  const joinRoom = () => {
    if (newRoom.trim() !== "") {
      navigate(`/room/${newRoom}`);
    }
  };

  return (
    <div>
      {!roomId ? (
        <div className="text-center mt-20">
          <h2 className="text-3xl font-bold text-green-600">
            FaceGram 💚 Private Chat
          </h2>

          <p className="mt-3 text-gray-600">
            Logged in as: {user.email}
          </p>

          <div className="mt-6">
            <button
              onClick={createRoom}
              className="bg-green-500 text-white px-6 py-2 rounded-xl"
            >
              Create New Room
            </button>
          </div>

          <div className="mt-6">
            <input
              placeholder="Enter Room ID"
              value={newRoom}
              onChange={(e) => setNewRoom(e.target.value)}
              className="border p-2 rounded-l-xl"
            />

            <button
              onClick={joinRoom}
              className="bg-blue-500 text-white px-4 py-2 rounded-r-xl"
            >
              Join
            </button>
          </div>
        </div>
      ) : (
        <FaceGramLayout roomId={roomId} user={user} />
      )}
    </div>
  );
}

export default ChatRoom;
