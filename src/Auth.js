import { useState } from "react";
import { auth } from "./firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

function Auth({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(true);

  const handleAuth = async () => {
    try {
      if (isSignup) {
        const userCred = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        setUser(userCred.user);
      } else {
        const userCred = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        setUser(userCred.user);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      
      {/* Auth Card */}
      <div className="bg-white shadow-xl rounded-2xl p-10 w-[350px]">

        {/* Logo */}
        <h1 className="text-3xl font-bold text-center text-green-600">
          FaceGram 💚
        </h1>

        <p className="text-center text-gray-500 mt-2">
          {isSignup ? "Create your account" : "Login to continue chatting"}
        </p>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Enter Email"
          className="w-full mt-6 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Enter Password"
          className="w-full mt-4 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Button */}
        <button
          onClick={handleAuth}
          className="w-full mt-6 bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition"
        >
          {isSignup ? "Sign Up" : "Login"}
        </button>

        {/* Switch Mode */}
        <p
          className="text-center mt-5 text-blue-500 cursor-pointer hover:underline"
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup
            ? "Already have an account? Login"
            : "New user? Create an account"}
        </p>
      </div>
    </div>
  );
}

export default Auth;
