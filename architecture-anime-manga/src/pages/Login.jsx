import React, { useEffect, useState } from "react";
import InputComponent from "../components/atoms/InputComponent";
import "./Signup.css";

export default function Login() {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        import.meta.env.VITE_REACT_APP_API_URL +
          "hetic-architecture/backend/api/login.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("User registered successfully");
        // Redirigez l'utilisateur vers une page de connexion ou faites autre chose après l'inscription réussie.
      } else {
        console.error("Error registering user:", data.message);
      }

      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="gap-10 flex flex-col items-center p-4">
      <div className="bg-black gap-10 flex flex-col items-center p-10 rounded-xl mt-16">
        <h1>Se connecter à Eiga</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-4 w-full"
        >
          <InputComponent
            type="text"
            placeholder="E-mail/Pseudo"
            required={true}
            id="username"
          />
          <InputComponent
            type="password"
            placeholder="Mot de passe"
            required={true}
            id="password"
          />
          <button type="submit">Se connecter</button>
        </form>
      </div>
    </div>
  );
}
