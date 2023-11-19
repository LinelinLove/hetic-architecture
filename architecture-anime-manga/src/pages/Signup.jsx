import React, { useEffect, useState } from "react";
import InputComponent from "../components/atoms/InputComponent";
import "./Signup.css";

export default function Signup() {
  // useEffect(() => {
  //   // Assurez-vous d'ajuster l'URL en fonction de votre configuration
  //   const apiUrl =
  //     import.meta.env.VITE_REACT_APP_API_URL +
  //     "hetic-architecture/backend/api/db_connexion.php";

  //   fetch(apiUrl)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log("Database connection successful:", data);
  //     })
  //     .catch((error) => {
  //       console.error("Error checking database connection:", error);
  //     });
  // }, []);

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
      const response = await fetch(
        import.meta.env.VITE_REACT_APP_API_URL +
          "hetic-architecture/backend/api/signup.php",
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
        <h1>S'inscrire à Eiga</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-4 w-full"
        >
          {/* <InputComponent type="text" placeholder="Nom" /> */}
          {/* <InputComponent type="text" placeholder="Prénom" /> */}
          <InputComponent
            type="text"
            placeholder="Pseudo"
            required={true}
            id="username"
          />
          <InputComponent
            type="email"
            placeholder="E-mail"
            required={true}
            id="email"
          />
          {/* <InputComponent type="telephone" placeholder="Téléphone" /> */}
          <InputComponent
            type="password"
            placeholder="Mot de passe"
            required={true}
            id="password"
          />
          <InputComponent
            type="password"
            placeholder="Confirmer mot de passe"
            required={true}
          />
          {/* <InputComponent type="date" placeholder="Date de naissance" /> */}

          {/* <label className="wrapper">
              <input
                type="date"
                required="required"
                className="w-full leading-10 px-4 rounded"
              />
              <span></span>
            </label> */}
          <button type="submit">S'inscrire</button>
        </form>
      </div>
    </div>
  );
}
