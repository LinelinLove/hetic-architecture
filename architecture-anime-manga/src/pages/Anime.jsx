import React, { useEffect, useState } from "react";
import { useAuth } from "../pages/AuthContext";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";

const Anime = () => {
  const { anime_id } = useParams(); // Utilisez useParams pour obtenir l'ID de l'URL
  const [animeInfo, setAnimeInfo] = useState(null);
  const [isFavorite, setIsfavorite] = useState(null);
  const [isComment, setIsComment] = useState(null);
  const [isNote, setIsNote] = useState(null);
  const [getNote, setGetNote] = useState(null);
  const [allComments, setAllComment] = useState(null);

  const [isUserNote, setIsUserNote] = useState(null);

  const [userNote, setUserNote] = useState(null);

  const [user_id, setUser_id] = useState(null);

  const { user, isUserLoggedIn } = useAuth();

  const userId = user ? user.uid : null;

  const [status, setStatus] = useState("");

  const handleStatusChange = (event) => {
    // Mettre à jour la valeur de l'état avec la valeur sélectionnée
    setStatus(event.target.value);
  };

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://api.jikan.moe/v4/anime/${anime_id}`);
        const data = await res.json();
        setAnimeInfo(data);

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
          setUser_id(getUserIdData.data.id);
        }

        // GET if this anime the favorite of the user
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

        if (favoriteData && favoriteData.status === "error") {
          setIsfavorite(false);
        } else {
          setIsfavorite(true);
        }

        // GET comments
        const commentsRes = await fetch(
          `${
            import.meta.env.VITE_REACT_APP_API_URL
          }hetic-architecture/backend/api/comments.php?animeId=${
            data.data.mal_id
          }`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const commentsData = await commentsRes.json();
        // console.log(commentsData);
        if (commentsData && commentsData.status === "error") {
          setIsComment(false);
        } else {
          setIsComment(true);
          setAllComment(commentsData.data);
          // console.log(allComments);
        }

        // GET note general
        const getNote = await fetch(
          `${
            import.meta.env.VITE_REACT_APP_API_URL
          }hetic-architecture/backend/api/note.php?animeId=${data.data.mal_id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const noteData = await getNote.json();
        if (noteData && noteData.status === "error") {
          setIsNote(false);
        } else {
          setIsNote(true);
          setGetNote(noteData.data);
        }

        // GET note de l'user
        const getNoteUser = await fetch(
          `${
            import.meta.env.VITE_REACT_APP_API_URL
          }hetic-architecture/backend/api/getNotePerUserAnime.php?userId=${user_id}&animeId=${
            data.data.mal_id
          }`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const noteDataUser = await getNoteUser.json();
        if (noteDataUser && noteDataUser.status === "error") {
          setIsUserNote(false);
        } else {
          setIsUserNote(true);
          setUserNote(noteDataUser);
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

  // POST fav
  const postFavorite = (event) => {
    event.preventDefault();

    const updatedData = {
      userId: user_id,
      animeId: animeInfo.data.mal_id,
      animeTitle: animeInfo.data.title,
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

  // DELETE fav
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

  // POST comment
  const postComment = (event) => {
    event.preventDefault();

    const commentContent = document.querySelector("textarea").value;

    if (commentContent.length < 3 || commentContent.length > 1024) {
      alert("La longueur du commentaire doit être entre 3 et 1024 caractères.");
      return;
    }

    const updatedData = {
      userId: user_id,
      animeId: animeInfo.data.mal_id,
      animeTitle: animeInfo.data.title,
      comment: commentContent,
    };

    // Effectuer le POST du commentaire
    fetch(
      import.meta.env.VITE_REACT_APP_API_URL +
        `hetic-architecture/backend/api/comments.php`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        document.querySelector("textarea").value = "";

        // Si le POST est réussi, effectuer le GET pour récupérer la liste mise à jour des commentaires
        fetch(
          `${
            import.meta.env.VITE_REACT_APP_API_URL
          }hetic-architecture/backend/api/comments.php?animeId=${
            animeInfo.data.mal_id
          }`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((response) => response.json())
          .then((commentsData) => {
            if (commentsData && commentsData.status === "error") {
              setIsComment(false);
            } else {
              setIsComment(true);
              setAllComment(commentsData.data);
            }
          })
          .catch((error) => console.error("Erreur:", error));
      })
      .catch((error) => console.error("Erreur:", error));
  };

  // POST comment
  const postNote = (event) => {
    event.preventDefault();

    const updatedData = {
      userId: user_id,
      animeId: animeInfo.data.mal_id,
      animeTitle: animeInfo.data.title,
      note: note,
    };

    // Effectuer le POST du commentaire
    fetch(
      import.meta.env.VITE_REACT_APP_API_URL +
        `hetic-architecture/backend/api/note.php`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        // Si le POST est réussi, effectuer le GET pour récupérer la liste mise à jour des commentaires
        fetch(
          `${
            import.meta.env.VITE_REACT_APP_API_URL
          }hetic-architecture/backend/api/note.php?animeId=${
            animeInfo.data.mal_id
          }`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((response) => response.json())
          .then((noteData) => {
            if (noteData && noteData.status === "error") {
              setIsNote(false);
            } else {
              setIsNote(true);
              console.log(noteData.data);
              setGetNote(noteData.data);
            }
          })
          .catch((error) => console.error("Erreur:", error));
      })
      .catch((error) => console.error("Erreur:", error));
  };

  // POST status
  const postStatus = (event) => {
    event.preventDefault();

    const updatedData = {
      userId: user_id,
      animeId: animeInfo.data.mal_id,
      animeTitle: animeInfo.data.title,
      status: status,
    };

    // Effectuer le POST du commentaire
    fetch(
      import.meta.env.VITE_REACT_APP_API_URL +
        `hetic-architecture/backend/api/watchlist.php`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        // Si le POST est réussi, effectuer le GET pour récupérer la liste mise à jour des commentaires
        // fetch(
        //   `${
        //     import.meta.env.VITE_REACT_APP_API_URL
        //   }hetic-architecture/backend/api/note.php?animeId=${
        //     animeInfo.data.mal_id
        //   }`,
        //   {
        //     method: "GET",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //   }
        // )
        //   .then((response) => response.json())
        //   .then((noteData) => {
        //     if (noteData && noteData.status === "error") {
        //       setIsNote(false);
        //     } else {
        //       setIsNote(true);
        //       console.log(noteData.data);
        //       setGetNote(noteData.data);
        //     }
        //   })
        //   .catch((error) => console.error("Erreur:", error));
      })
      .catch((error) => console.error("Erreur:", error));
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
        <p>
          Note :{" "}
          {isNote
            ? getNote.nb === "0"
              ? "Pas encore de note, soyez le premier à noter cette anime !"
              : `${getNote.note_general} / 10 (${getNote.nb} ${
                  getNote.nb === "1" ? "membre" : "membres"
                })`
            : "Pas encore de note, soyez le premier à noter cette anime !"}
        </p>

        {isUserLoggedIn ? (
          <div className="flex flex-row gap-x-2 items-center">
            <label htmlFor="note">Ma note : </label>
            <input
              type="number"
              id="note"
              name="note"
              value={note || ""}
              min="1"
              max="10"
              step="1"
              onChange={handleNoteChange}
            />
            <p>/ 10</p>
            <button onClick={postNote}>Valider</button>
            {userNote
              ? `Vous avez deja mis une note à cet anime`
              : "Vous n'avez pas encore noté cet anime"}
          </div>
        ) : (
          ""
        )}
        <div>
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
            <select
              name="status-anime"
              id="status-anime"
              onClick={handleStatusChange}
            >
              <option value="">--</option>
              <option value="finished">Terminé</option>
              <option value="towatch">A voir</option>
              <option value="giveup">Abandonné</option>
              <option value="ongoing">En cours</option>
            </select>
            <button onClick={postStatus}>Valider</button>
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
              maxLength={1024}
              minLength={3}
            ></textarea>
            <button onClick={postComment}>Envoyer</button>
          </div>
        ) : (
          ""
        )}

        {isComment ? (
          allComments.map((comment, index) => (
            <div key={comment.id}>
              <div className="flex flex-row gap-x-4 mt-8">
                <div className="flex flex-col bg-black w-full rounded p-2 gap-2">
                  <p>
                    #{index + 1} Par{" "}
                    <Link to={`/profil/${comment.user_id}`}>
                      {comment.username}
                    </Link>{" "}
                    le {comment.date.split(" ")[0]} à{" "}
                    {comment.date.split(" ")[1]}
                  </p>
                  <p>{comment.comment}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Pas de commentaire pour le moment !</p>
        )}
      </div>
    </div>
  );
};

export default Anime;
