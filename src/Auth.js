import { useState } from "react";
import { auth, db } from "./firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";

function Auth({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSignup, setIsSignup] = useState(true);

  const handleAuth = async () => {
    try {
      if (isSignup) {
        // ✅ Signup
        const userCred = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        // Save new user profile
        await setDoc(doc(db, "users", userCred.user.uid), {
          name: name,
          email: email,
          avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${name}`,
          online: true,
        });

        setUser(userCred.user);
      } else {
        // ✅ Login
        const userCred = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        // ✅ Fix old users (auto-create profile if missing)
        await setDoc(
          doc(db, "users", userCred.user.uid),
          {
            name: email.split("@")[0],
            email: email,
            avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${email}`,
            online: true,
          },
          { merge: true }
        );

        setUser(userCred.user);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-[350px]">
        <h1 className="text-3xl font-bold text-center text-green-600">
          FaceGram 💚
        </h1>

        <p className="text-center text-gray-500 mt-2">
          {isSignup ? "Create your account" : "Login to continue chatting"}
        </p>

        {/* Name Input */}
        {isSignup && (
          <input
            type="text"
            placeholder="Enter Full Name"
            className="w-full mt-6 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
            onChange={(e) => setName(e.target.value)}
          />
        )}

        {/* Email Input */}
        <input
          type="email"
          placeholder="Enter Email"
          className="w-full mt-4 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
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

        {/* Switch */}
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
