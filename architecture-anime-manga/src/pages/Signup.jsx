import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import InputComponent from "../components/atoms/InputComponent";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../pages/AuthContext";
import { app } from "../firebaseConfig";

const auth = getAuth(app);

export default function Signup() {
  const { isUserLoggedIn } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Créez l'utilisateur dans Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;
      const firebaseUid = user.uid;
      // Enregistrez l'UID de Firebase avec d'autres données dans votre base de données personnalisée
      const response = await fetch(
        import.meta.env.VITE_REACT_APP_API_URL +
          "hetic-architecture/backend/api/signup.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            firebaseUid: firebaseUid,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("User registered successfully");

        // Redirigez l'utilisateur vers une page de connexion ou faites autre chose après l'inscription réussie.
        // Mettez ici votre logique de redirection ou d'autres actions
      } else {
        console.error("Error registering user:", data.message);
      }

      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };
  if (isUserLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <div className="gap-10 flex flex-col items-center p-4">
      <div className="bg-black gap-10 flex flex-col items-center p-10 rounded-xl mt-16">
        <h1>S'inscrire à Eiga</h1>
        <form
          onSubmit={handleSubmit}
          onKeyDown={handleEnterKeyPress}
          className="flex flex-col items-center gap-4 w-full"
        >
          <InputComponent
            type="text"
            placeholder="Pseudo"
            required={true}
            name="username"
            onChange={handleChange}
          />
          <InputComponent
            type="email"
            placeholder="E-mail"
            required={true}
            name="email"
            onChange={handleChange}
          />
          <InputComponent
            type="password"
            placeholder="Mot de passe"
            required={true}
            name="password"
            onChange={handleChange}
          />

          <button type="submit">S'inscrire</button>
          <p>
            Vous avez déjà un compte ? <Link to="/login">Se connecter</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
