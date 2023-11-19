import InputComponent from "../components/atoms/InputComponent";
import "./Signup.css";

import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { app } from "../firebaseConfig";

const auth = getAuth(app);

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User logged in successfully:", user);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="gap-10 flex flex-col items-center p-4">
      <div className="bg-black gap-10 flex flex-col items-center p-10 rounded-xl mt-16">
        <h1>Se connecter à Eiga</h1>
        <InputComponent
          type="text"
          placeholder="E-mail"
          required={true}
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputComponent
          type="password"
          placeholder="Mot de passe"
          required={true}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSignIn}>Se connecter</button>
      </div>
    </div>
  );
}
