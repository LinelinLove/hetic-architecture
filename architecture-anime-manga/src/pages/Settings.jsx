import React, { useEffect, useState, useContext } from "react";
import "./Signup.css";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../pages/AuthContext";

export default function Settings() {
  const { user, isUserLoggedIn } = useAuth();

  useEffect(() => {
    if (isUserLoggedIn) {
      const uid = user ? user.uid : null;
    }
  }, [isUserLoggedIn, user]);

  const [userData, setUserData] = useState({});
  const userId = user ? user.uid : null;

  // GET
  useEffect(() => {
    if (userId) {
      fetch(
        import.meta.env.VITE_REACT_APP_API_URL +
          `hetic-architecture/backend/api/settings.php?userId=${userId}`,
        {
          method: "GET",
          headers: {
            // Ajoutez d'autres en-têtes si nécessaire
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setUserData(data.data);
        })
        .catch((error) =>
          console.error("Erreur de récupération des données:", error)
        );
    }
  }, [userId]);

  const [formValues, setFormValues] = useState({
    lastname: "",
    firstname: "",
    telephone: "",
    gender: "",
    birthday: "",
    profil_picture: "",
  });

  // Mettez à jour formValues lorsque userData change
  useEffect(() => {
    setFormValues({
      lastname: userData.lastname || "",
      firstname: userData.firstname || "",
      telephone: userData.telephone || "",
      gender: userData.gender || "",
      birthday: userData.birthday || "",
      profil_picture: userData.profil_picture || "",
    });
  }, [userData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // POST
  const handleUpdate = (event) => {
    event.preventDefault();

    const updatedData = Object.fromEntries(
      Object.entries(formValues).map(([key, value]) => [
        key,
        value === "" ? null : value,
      ])
    );

    // Ajouter userId à l'objet
    updatedData.userId = userId;

    fetch(
      import.meta.env.VITE_REACT_APP_API_URL +
        `hetic-architecture/backend/api/settings.php`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    )
      .then((response) => response.json())
      .then((data) => console.log(data)) // Vérifiez la réponse renvoyée par le serveur
      .catch((error) => console.error("Erreur:", error));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.size <= 4 * 1024 * 1024) {
      setImageFile(file);
    } else {
      alert("Veuillez sélectionner une image de moins de 4 Mo.");
    }
  };

  return (
    <div className="gap-10 flex flex-col items-center p-4">
      <div className="bg-black gap-10 flex flex-col items-center p-10 rounded-xl mt-16">
        <h1>Paramètres du compte</h1>

        <form className="flex flex-col items-center gap-4 w-full">
          <input
            type="file"
            accept="image/*"
            // onChange={handleImageChange}
            className="self-start"
            name="profil_picture"
          />

          <div className="flex flex-row justify-between w-full gap-8">
            <div className="flex gap-2">
              <input
                type="radio"
                id="femme"
                name="gender"
                value="Femme"
                onChange={handleInputChange}
                checked={formValues.gender === "Femme"}
              />
              <label htmlFor="femme">Femme</label>
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                id="homme"
                name="gender"
                value="Homme"
                onChange={handleInputChange}
                checked={formValues.gender === "Homme"}
              />
              <label htmlFor="homme">Homme</label>
            </div>

            <div className="flex gap-2">
              <input
                type="radio"
                id="autre"
                name="gender"
                value="autre"
                onChange={handleInputChange}
                checked={formValues.gender === "autre"}
              />
              <label htmlFor="autre">Autre(s)</label>
            </div>
          </div>

          <input
            type="text"
            placeholder="Pseudo"
            name="username"
            defaultValue={userData.username}
            className="w-full leading-10 px-4 rounded"
            disabled
          />
          <input
            type="email"
            placeholder="E-mail"
            name="email"
            defaultValue={userData.mail}
            className="w-full leading-10 px-4 rounded"
            disabled
          />
          <input
            type="text"
            placeholder="Nom"
            name="lastname"
            maxLength={30}
            onChange={handleInputChange}
            value={formValues.lastname}
            className="w-full leading-10 px-4 rounded"
          />
          <input
            type="text"
            placeholder="Prénom"
            name="firstname"
            maxLength={30}
            onChange={handleInputChange}
            value={formValues.firstname}
            className="w-full leading-10 px-4 rounded"
          />
          <input
            type="tel"
            placeholder="Téléphone"
            name="telephone"
            maxLength={12}
            onChange={handleInputChange}
            value={formValues.telephone}
            className="w-full leading-10 px-4 rounded"
          />
          <label className="wrapper">
            <input
              type="date"
              required="required"
              className="w-full leading-10 px-4 rounded"
              onChange={handleInputChange}
              value={formValues.birthday}
              name="birthday"
            />
            <span></span>
          </label>
          <button type="submit" onClick={handleUpdate}>
            Mettre à jour
          </button>
        </form>
      </div>
    </div>
  );
}
