import InputComponent from "../components/atoms/InputComponent";
import { Link } from "react-router-dom";

import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { app } from "../firebaseConfig";

const auth = getAuth(app);

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      console.log("User logged in successfully:", user);
      // Utilisez l'ID de l'utilisateur pour récupérer les informations supplémentaires depuis votre base de données
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSignIn(e);
    }
  };

  return (
    <div className="gap-10 flex flex-col items-center p-4">
      <form
        onKeyDown={handleEnterKeyPress}
        className="bg-black gap-10 flex flex-col items-center p-10 rounded-xl mt-16"
      >
        <h1>Connexion à Eiga</h1>
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
        <button type="submit" onClick={handleSignIn}>
          Connexion
        </button>
        <p>
          Vous n'avez pas encore de compte ?{" "}
          <Link to="/signup">S'inscrire</Link>
        </p>
      </form>
    </div>
  );
}
