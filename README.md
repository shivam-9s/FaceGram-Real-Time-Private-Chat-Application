# 💬 FaceGram – Real-Time Private Chat Application

FaceGram is a modern real-time private chat web application built using React and Firebase.  
Users can create private rooms, share links with friends, and chat instantly from anywhere in the world.
## 🌍 Live Demo

🔗 https://facegram-chat.vercel.app
## ✨ Features

- 🔐 Email & Password Authentication
- 👤 User Profiles (Name + Avatar)
- 💬 Real-Time Messaging
- 🔗 Shareable Private Room Links
- 🟢 Online / Offline Status
- ⌨️ Typing Indicator
- 🖼 Image Sharing
- 📱 Responsive WhatsApp-style UI
- 🚀 Deployed on Vercel
## 🛠 Tech Stack

**Frontend**
- React.js
- React Router
- Tailwind CSS

**Backend (Serverless)**
- Firebase Authentication
- Firebase Firestore
- Firebase Storage

**Deployment**
- Vercel
## 🚀 Run Locally

Follow these steps to set up and run **FaceGram** on your local machine.

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/shivam-9s/FaceGram.git
```
### 2️⃣ Navigate to the Project Directory
```bash
cd FaceGram/frontend
```
### 3️⃣ Install Dependencies
```bash
npm install
```
### 4️⃣ Start Development Server
```bash
npm start
```
App will run on:
http://localhost:3000
### 🔧 Environment Setup

You need to configure Firebase.

Step 1: Create Firebase Project

Go to [https://console.firebase.google.com](https://console.firebase.google.com/)

Create new project

Enable Authentication (Email/Password)

Enable Firestore Database

Step 2: Add Firebase Config

Create a file:
```bash
src/firebase.js
```
### Add your Firebase credentials:
```bash
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
```
### 🔒 Firestore Rules (Important)

Set your Firestore rules like this:
```bash
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    match /rooms/{roomId}/messages/{messageId} {
      allow read, write: if request.auth != null;
    }

    match /users/{userId} {
      allow read, write: if request.auth != null;
    }
  }
}
```
### 🏗️ Deployment (Vercel)

To deploy:
```bash
npm run build
```
Then deploy using:
``` bash
vercel --prod
```
### 📸 Screenshots
<img width="1926" height="1022" alt="image" src="https://github.com/user-attachments/assets/90068b14-9c54-4d67-9a86-82e9434278fe" />

<img width="1927" height="1027" alt="image" src="https://github.com/user-attachments/assets/03d05577-fe81-496f-847f-c13bebf122b4" />

<img width="1927" height="1027" alt="image" src="https://github.com/user-attachments/assets/90e1f870-ed64-4f6d-bc4a-facbfd85055e" />







