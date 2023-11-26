import React, { useEffect, useState } from "react";
import { useAuth } from "../pages/AuthContext";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";

const Anime = () => {
  const { anime_id } = useParams(); // Utilisez useParams pour obtenir l'ID de l'URL
  const [animeInfo, setAnimeInfo] = useState(null);
  const [isFavorite, setIsfavorite] = useState(null);
  const [user_id, setUser_id] = useState(null);

  const { user, isUserLoggedIn } = useAuth();

  const userId = user ? user.uid : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://api.jikan.moe/v4/anime/${anime_id}`);
        const data = await res.json();
        setAnimeInfo(data);

        // console.log(userId);

        const getUserId = await fetch(
          import.meta.env.VITE_REACT_APP_API_URL +
            `hetic-architecture/backend/api/settings.php?userId=${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const getUserIdData = await getUserId.json();

        if (getUserIdData && getUserIdData.status === "success") {
          // console.log(getUserIdData);
          setUser_id(getUserIdData.data.id);
          // console.log(user_id);
        }

        // Maintenant que animeInfo est mis à jour, nous pouvons utiliser son contenu ici
        const favoriteRes = await fetch(
          `${
            import.meta.env.VITE_REACT_APP_API_URL
          }hetic-architecture/backend/api/favorite.php?userId=${user_id}&animeId=${
            data.data.mal_id
          }`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const favoriteData = await favoriteRes.json();
        console.log(user_id, data.data.mal_id);

        if (favoriteData && favoriteData.status === "error") {
          setIsfavorite(false);
          console.log(favoriteData);
        } else {
          setIsfavorite(true);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données de l'anime",
          error
        );
      }
    };

    fetchData();
  }, [anime_id, userId, user_id]);

  const [note, setNote] = useState("");
  const [nbepisode, setNbEpisode] = useState("");

  const handleNoteChange = (event) => {
    // Assurez-vous que la note est dans la plage spécifiée (entre 0 et 10)
    const newNote = Math.max(1, Math.min(10, event.target.value));
    setNote(newNote);
  };

  const handleEpisodeChange = (event) => {
    const newNbEpisode = Math.max(
      1,
      Math.min(animeInfo.data.episodes, event.target.value)
    );
    setNbEpisode(newNbEpisode);
  };

  // POST
  const postFavorite = (event) => {
    event.preventDefault();

    const updatedData = {
      userId: user_id,
      animeId: animeInfo.data.mal_id,
    };
    fetch(
      import.meta.env.VITE_REACT_APP_API_URL +
        `hetic-architecture/backend/api/favorite.php`,
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
    setIsfavorite(true);
  };

  // DELETE
  const deleteFavorite = (event) => {
    event.preventDefault();

    const updatedData = {
      userId: user_id,
      animeId: animeInfo.data.mal_id,
    };
    fetch(
      import.meta.env.VITE_REACT_APP_API_URL +
        `hetic-architecture/backend/api/favorite.php`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    )
      .then((response) => response.json())
      .then((data) => console.log(data)) // Vérifiez la réponse renvoyée par le serveur
      .catch((error) => console.error("Erreur:", error));
    setIsfavorite(false);
  };

  if (!animeInfo) {
    return <div>Chargement...</div>;
  }
  return (
    <div className="p-4">
      <div className="flex flex-row gap-8">
        <img
          src={animeInfo.data.images.jpg.large_image_url}
          alt="animeImage"
          className="h-[385px] object-cover rounded"
        />
        <div className="flex flex-col gap-y-8">
          <h1>{animeInfo.data.title}</h1>
          <p>{animeInfo.data.synopsis}</p>
        </div>
      </div>

      <div className="flex flex-col items-start gap-2 mt-4">
        <p>Note : XX/10 (X membres)</p>

        {isUserLoggedIn ? (
          <div className="flex flex-row gap-x-2 items-center">
            <label htmlFor="note">Ma note : </label>
            <input
              type="number"
              id="note"
              name="note"
              value={note}
              min="1"
              max="10"
              step="1"
              onChange={handleNoteChange}
            />
            / 10
          </div>
        ) : (
          ""
        )}
        <div>
          {/* soit l'un soit l'autre */}
          {isUserLoggedIn ? (
            <div>
              {!isFavorite ? (
                <button onClick={postFavorite}>
                  <FontAwesomeIcon icon={faHeartRegular} />
                </button>
              ) : (
                <button onClick={deleteFavorite}>
                  <FontAwesomeIcon icon={faHeartSolid} />
                </button>
              )}
            </div>
          ) : (
            ""
          )}
        </div>
        {isUserLoggedIn ? (
          <div className="flex flex-row gap-x-2 items-center">
            <label htmlFor="status-anime">Statut : </label>
            <select name="status-anime" id="status-anime">
              <option value="">--</option>
              <option value="finished">Terminé</option>
              <option value="towatch">A voir</option>
              {/* pas de nombre d'épisode */}
              <option value="giveup">Abandonné</option>
              <option value="ongoing">En cours</option>
            </select>
          </div>
        ) : (
          ""
        )}

        {isUserLoggedIn ? (
          <div className="flex flex-row items-center gap-4">
            <label htmlFor="nbepisode">Nombre d'épisode : </label>
            <div className="flex flex-row gap-2">
              <input
                type="number"
                id="nbepisode"
                name="nbepisode"
                value={nbepisode}
                min="1"
                max={animeInfo.data.episodes}
                step="1"
                onChange={handleEpisodeChange}
              />
              <p> / {animeInfo.data.episodes}</p>
            </div>
            <button>Valider</button>
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="mt-10">
        <p className="text-3xl">Section commentaire</p>
        {isUserLoggedIn ? (
          <div className="flex flex-col gap-y-4 items-start my-4">
            <textarea
              name=""
              id=""
              cols="100"
              rows="4"
              placeholder={`J'ai adoré l'anime ${animeInfo.data.title}...`}
              className="rounded p-2"
            ></textarea>
            <button>Envoyer</button>
          </div>
        ) : (
          ""
        )}
        <div>
          <div className="flex flex-row gap-x-4 mt-8">
            <img
              src={animeInfo.data.images.jpg.large_image_url}
              alt="animeImage"
              className="h-[40px] w-[40px] object-cover rounded"
            />
            <div className="flex flex-col bg-red-200 w-full rounded p-2 gap-2">
              <p>#1 Par Pseudodelapersonne le 25/11/2023 à 13h40</p>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Possimus dolor culpa quos aspernatur dolorum perferendis in id
                pariatur et impedit ullam commodi maiores soluta exercitationem
                perspiciatis repellat corrupti, eum dolore.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Anime;
