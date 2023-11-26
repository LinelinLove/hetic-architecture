import React, { useEffect, useState, useContext } from "react";
import { useAuth } from "../pages/AuthContext";
import { useParams, Link } from "react-router-dom";

export default function Profil() {
  const { user, isUserLoggedIn } = useAuth();
  const { user_id } = useParams();
  // useEffect(() => {
  //   if (isUserLoggedIn) {
  //     const uid = user ? user.uid : null;
  //   }
  // }, [isUserLoggedIn, user]);

  const [userData, setUserData] = useState({});
  const userId = user ? user.uid : null;
  const [selectedTab, setSelectedTab] = useState("favoris");
  const [age, setAge] = useState("");
  const [userNotFound, setUserNotFound] = useState(false);

  // GET
  useEffect(() => {
    if (user_id) {
      fetch(
        import.meta.env.VITE_REACT_APP_API_URL +
          `hetic-architecture/backend/api/users.php?userId=${user_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data && data.status == "error") {
            setUserNotFound(true);
          } else {
            setUserData(data.data);
            if (data.data.birthdate) {
              setAge(calculateAge(data.data.birthdate));
            }
          }
        })
        .catch((error) =>
          console.error("Erreur de récupération des données:", error)
        );
    } else {
      fetch(
        import.meta.env.VITE_REACT_APP_API_URL +
          `hetic-architecture/backend/api/settings.php?userId=${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setUserData(data.data);
          if (data.data.birthdate) {
            setAge(calculateAge(data.data.birthdate));
          }
        })
        .catch((error) =>
          console.error("Erreur de récupération des données:", error)
        );
    }
  }, [userId, user_id]);

  function calculateAge(dateOfBirth) {
    const birthDate = new Date(dateOfBirth);
    const currentDate = new Date();

    let age = currentDate.getFullYear() - birthDate.getFullYear();

    const currentMonth = currentDate.getMonth();
    const birthMonth = birthDate.getMonth();

    if (
      currentMonth < birthMonth ||
      (currentMonth === birthMonth &&
        currentDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }

  if (userNotFound) {
    return (
      <div className="gap-4 flex flex-col items-start p-4">
        <p>Cet utilisateur n'existe pas.</p>
      </div>
    );
  }
  return (
    <div className="gap-4 flex flex-col items-start p-4">
      {/* <div className="bg-black gap-4 flex flex-col items-start p-10 rounded-xl mt-16"> */}
      <h1>Profil de {userData.username}</h1>
      <div className="flex flex-row gap-8">
        <div>
          {userData.profil_picture && (
            <img
              src={`${userData.profil_picture}`}
              alt="Profil"
              className="w-48 h-48 self-start object-cover"
            />
          )}
        </div>

        <div>
          {userData.firstname && <p>Prénom : {userData.firstname}</p>}
          {userData.lastname && <p>Nom : {userData.lastname}</p>}
          {userData.birthdate && <p>Âge : {age} ans</p>}
          {userData.gender && <p>Genre : {userData.gender}</p>}
        </div>
      </div>

      <div className="flex flex-row justify-between w-full">
        <p
          onClick={() => setSelectedTab("favoris")}
          className={`cursor-pointer hover:underline ${
            selectedTab === "favoris" ? "font-bold underline" : ""
          }`}
        >
          Liste des favoris (??)
        </p>
        <p
          onClick={() => setSelectedTab("watchlist")}
          className={`cursor-pointer hover:underline ${
            selectedTab === "watchlist" ? "font-bold underline" : ""
          }`}
        >
          Watchlist (??)
        </p>
        <p
          onClick={() => setSelectedTab("note")}
          className={`cursor-pointer hover:underline ${
            selectedTab === "note" ? "font-bold underline" : ""
          }`}
        >
          Note (??)
        </p>
        <p
          onClick={() => setSelectedTab("commentaire")}
          className={`cursor-pointer hover:underline ${
            selectedTab === "commentaire" ? "font-bold underline" : ""
          }`}
        >
          Commentaire (??)
        </p>
      </div>

      <div style={{ display: selectedTab === "favoris" ? "block" : "none" }}>
        <p>Ici vous trouverez les favoris</p>
        <p>Ici vous trouverez les favoris</p>
      </div>
      <div style={{ display: selectedTab === "watchlist" ? "block" : "none" }}>
        <p>Ici vous trouverez la watchlist</p>
        <p>Ici vous trouverez la watchlist</p>
      </div>
      <div style={{ display: selectedTab === "note" ? "block" : "none" }}>
        <p>Ici vous trouverez les animes que {userData.username} a notés</p>
        <p>Ici vous trouverez les animes que {userData.username} a notés</p>
      </div>
      <div
        style={{ display: selectedTab === "commentaire" ? "block" : "none" }}
      >
        <p>Ici vous trouverez les animes que {userData.username} a commentés</p>
        <p>Ici vous trouverez les animes que {userData.username} a commentés</p>
      </div>
    </div>

    // </div>
  );
}
