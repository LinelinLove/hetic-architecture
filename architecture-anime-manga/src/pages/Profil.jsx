import React, { useEffect, useState, useContext } from "react";
import { useAuth } from "../pages/AuthContext";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./Profil.css";

export default function Profil() {
  const navigate = useNavigate();
  const { user, isUserLoggedIn } = useAuth();

  // si on recup un id dans la route
  const { user_id } = useParams();

  const [userData, setUserData] = useState({});
  const [age, setAge] = useState("");
  const userId = user ? user.uid : null;

  const [selectedTab, setSelectedTab] = useState("favoris");
  const [userNotFound, setUserNotFound] = useState(false);
  const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);
  const [getFavData, setGetFavData] = useState(null);
  const [getCommentsData, setGetCommentsData] = useState(null);
  const [getNoteData, setGetNoteData] = useState(null);
  const [getWatchListData, setGetWatchListData] = useState(null);

  const handleAnimeClick = (anime) => {
    navigate(`/anime/${anime}`);
  };

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
        )
        .finally(() => setIsUserDataLoaded(true));
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
        )
        .finally(() => setIsUserDataLoaded(true));
    }
  }, [userId, user_id]);

  useEffect(() => {
    if (isUserDataLoaded && userData !== undefined) {
      // fetch la liste des favoris
      fetch(
        import.meta.env.VITE_REACT_APP_API_URL +
          `hetic-architecture/backend/api/getFavoriteperUser.php?userId=${userData.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setGetFavData(data.data);
        })
        .catch((error) =>
          console.error("Erreur de récupération des données:", error)
        );

      // fetch les animes ou le user a commenté
      fetch(
        import.meta.env.VITE_REACT_APP_API_URL +
          `hetic-architecture/backend/api/getCommentPerUser.php?userId=${userData.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setGetCommentsData(data.data);
        })
        .catch((error) =>
          console.error("Erreur de récupération des données:", error)
        );

      // fetch les animes ou l'utilisateur connecté a mi une note
      fetch(
        import.meta.env.VITE_REACT_APP_API_URL +
          `hetic-architecture/backend/api/getNotePerUser.php?userId=${userData.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setGetNoteData(data.data);
        })
        .catch((error) =>
          console.error("Erreur de récupération des données:", error)
        );

      // fetch les animes ou a mis note
      fetch(
        import.meta.env.VITE_REACT_APP_API_URL +
          `hetic-architecture/backend/api/getWatchlistPerUser.php?userId=${userData.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setGetWatchListData(data.data);
        })
        .catch((error) =>
          console.error("Erreur de récupération des données:", error)
        );
    }
  }, [isUserDataLoaded, userData]);

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
    <div className="gap-4 flex flex-col items-start p-4 ml-14 ">
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

      <div className="flex flex-row justify-between w-11/12 mr-4 ml-4">
        <p
          onClick={() => setSelectedTab("favoris")}
          className={`cursor-pointer hover:underline ${
            selectedTab === "favoris" ? "font-bold underline" : ""
          }`}
        >
          Liste des favoris
          {getFavData != null ? ` (${getFavData.length})` : " (0)"}
        </p>
        <p
          onClick={() => setSelectedTab("watchlist")}
          className={`cursor-pointer hover:underline ${
            selectedTab === "watchlist" ? "font-bold underline" : ""
          }`}
        >
          Watchlist{" "}
          {getWatchListData != null ? ` (${getWatchListData.length})` : " (0)"}
        </p>
        <p
          onClick={() => setSelectedTab("note")}
          className={`cursor-pointer hover:underline ${
            selectedTab === "note" ? "font-bold underline" : ""
          }`}
        >
          {getNoteData != null
            ? `Note${getNoteData.length !== 1 ? "s" : ""} (${
                getNoteData.length
              })`
            : "Notes (0)"}
        </p>
        <p
          onClick={() => setSelectedTab("commentaire")}
          className={`cursor-pointer hover:underline ${
            selectedTab === "commentaire" ? "font-bold underline" : ""
          }`}
        >
          Commentaires{" "}
          {getCommentsData != null ? ` (${getCommentsData.length})` : " (0)"}
        </p>
      </div>

      <div
        className="w-full"
        style={{ display: selectedTab === "favoris" ? "block" : "none" }}
      >
        {getFavData != null ? (
          <div className="w-full">
            {getFavData.map((item, index) => (
              <p
                onClick={() => handleAnimeClick(item.anime_id)}
                key={index}
                className="transition cursor-pointer duration-300 ease-in-out hover:opacity-75 hover:bg-black w-11/12 mr-4 ml-4 p-2 rounded"
              >
                {item.anime_title}
              </p>
            ))}
          </div>
        ) : (
          `La liste de favoris de ${userData.username} est vide pour le moment !`
        )}
      </div>
      <div
        className="w-full"
        style={{
          display: selectedTab === "watchlist" ? "block" : "none",
        }}
      >
        {getWatchListData != null ? (
          <div className="w-full">
            {getWatchListData.map((item, index) => (
              <p
                onClick={() => handleAnimeClick(item.anime_id)}
                key={index}
                className="transition cursor-pointer duration-300 ease-in-out hover:opacity-75 hover:bg-black rounded w-11/12 mr-4 ml-4 flex flex-row gap-x-4 justify-start w-full items-center"
              >
                <span
                  className={`w-[100px] m-2 p-2 rounded text-center ${
                    item.status === "ongoing"
                      ? "bg-yellow-500"
                      : item.status === "finished"
                      ? "bg-green-500"
                      : item.status === "giveup"
                      ? "bg-red-500"
                      : item.status === "towatch"
                      ? "bg-blue-500"
                      : ""
                  }`}
                >
                  {item.status === "ongoing"
                    ? "En cours"
                    : item.status === "finished"
                    ? "Terminé"
                    : item.status === "giveup"
                    ? "Abandonné"
                    : item.status === "towatch"
                    ? "À voir"
                    : ""}
                </span>

                <span className="w-[50px]">{item.current_episode}</span>

                <span>{item.anime_title}</span>
              </p>
            ))}
          </div>
        ) : (
          `La watchlist de ${userData.username} est vide pour le moment !`
        )}
      </div>
      <div
        className="w-full"
        style={{ display: selectedTab === "note" ? "block" : "none" }}
      >
        {getNoteData != null ? (
          <div className="w-fw-11/12 mr-4 ml-4">
            {getNoteData.map((item, index) => (
              <p
                onClick={() => handleAnimeClick(item.anime_id)}
                key={index}
                className="flex flex-row items-center transition cursor-pointer duration-300 ease-in-out hover:opacity-75 hover:bg-black p-2 rounded flex flex-row gap-x-4 w-11/12 mr-4 ml-4"
              >
                <span className="w-[60px] text-center rounded p-2 bg-white text-black">
                  {item.note}/10
                </span>
                <span>{item.anime_title}</span>
              </p>
            ))}
          </div>
        ) : (
          `La liste de favoris de ${userData.username} est vide pour le moment !`
        )}
      </div>
      <div
        className="w-full"
        style={{
          display: selectedTab === "commentaire" ? "block" : "none",
        }}
      >
        {getCommentsData != null
          ? getCommentsData.map((comment, index) => (
              <div key={index}>
                <div className="flex flex-row gap-x-4 mt-8 w-11/12 mr-4 ml-4">
                  <Link to={`/profil/${userData.username}`}>
                    <img
                      src={userData.profil_picture}
                      alt="animeImage"
                      className="h-[72px] w-[72px] !max-w-[72px] object-cover rounded"
                    />
                  </Link>
                  <div className="flex flex-col bg-black w-full rounded p-2 gap-2 ">
                    <p>
                      <Link to={`/anime/${comment.anime_id}`} className="text-[#1fc0b8]">
                        {comment.anime_title}
                      </Link>{" "}
                      - Par{" "}
                      <Link to={`/profil/${userData.username}`} className="text-[#1fc0b8]">
                        {userData.username}{" "}
                      </Link> <span className="font-bold">
                      le {comment.date.split(" ")[0]}</span> à{" "}
                      <span className="font-bold">{comment.date.split(" ")[1]}</span>
                    </p>
                    <p>{comment.comment}</p>
                  </div>
                </div>
              </div>
            ))
          : `${userData.username} n'a encore commenté encore aucune fiche d'anime !`}
      </div>
    </div>

    // </div>
  );
}
