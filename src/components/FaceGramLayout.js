import Chat from "../chat";

function FaceGramLayout({ roomId, user }) {
  return (
    <div className="h-screen flex bg-gray-100">
      
      {/* Sidebar */}
      <div className="w-1/4 bg-white border-r">
        
        {/* Header */}
        <div className="p-4 bg-green-600 text-white text-xl font-bold">
          FaceGram 💚
        </div>

        {/* User Info */}
        <div className="p-4 text-gray-700">
          <p className="font-semibold">{user.name}</p>

          <img
            src={user.avatar}
            alt="avatar"
            className="w-12 h-12 rounded-full mt-3"
          />
        </div>

        {/* Share Link */}
        <div className="p-4 border-t text-sm text-gray-600">
          Share this link:
          <p className="font-bold text-blue-600 break-words">
            {window.location.origin}/room/{roomId}
          </p>
        </div>
      </div>

      {/* Chat Section */}
      <div className="w-3/4 flex flex-col">
        
        {/* Room Header */}
        <div className="p-4 bg-green-500 text-white font-semibold">
          Room ID: {roomId}
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto">
          <Chat roomId={roomId} user={user} />
        </div>
      </div>
    </div>
  );
}

export default FaceGramLayout;
