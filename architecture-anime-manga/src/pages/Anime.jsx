import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Anime = () => {
  const { anime_id } = useParams(); // Utilisez useParams pour obtenir l'ID de l'URL

  const [animeInfo, setAnimeInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://api.jikan.moe/v4/anime/${anime_id}`);
        const data = await res.json();
        setAnimeInfo(data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données de l'anime",
          error
        );
      }
    };

    fetchData();
  }, [anime_id]);

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

        <div>
          {/* soit l'un soit l'autre */}
          <button>Ajouter au favoris</button>
          <button>Supprimer des favoris</button>
        </div>
        <div className="flex flex-row gap-x-2 items-center">
          <label for="status-anime">Statut : </label>
          <select name="status-anime" id="status-anime">
            <option value="">--</option>
            <option value="finished">Terminé</option>
            <option value="towatch">A voir</option>
            {/* pas de nombre d'épisode */}
            <option value="giveup">Abandonné</option>
            <option value="ongoing">En cours</option>
          </select>
        </div>

        <div className="flex flex-row items-center gap-4">
          <label htmlFor="nbepisode">Nombre d'épisode : </label>
          <div>
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
            / {animeInfo.data.episodes}
          </div>
          <button>Valider</button>
        </div>
      </div>

      <div>
        <p className="text-3xl">Section commentaire</p>
        <textarea
          name=""
          id=""
          cols="100"
          rows="4"
          placeholder={`J'ai adoré l'anime ${animeInfo.data.title}...`}
        ></textarea>
        <p>Commentaire de machin</p>
        <p>Commentaire de machin</p>
        <p>Commentaire de machin</p>
        <p>Commentaire de machin</p>
        <p>Commentaire de machin</p>
        <p>Commentaire de machin</p>
      </div>
    </div>
  );
};

export default Anime;
