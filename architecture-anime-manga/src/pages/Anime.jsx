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

  if (!animeInfo) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="p-4">
      <h1>{animeInfo.data.title}</h1>
      <img
        src={animeInfo.data.images.jpg.large_image_url}
        alt="animeImage"
        className="h-[385px] object-cover rounded"
      />
      <h4 className="font-bold text-3xl">Resume</h4>
      <p>{animeInfo.data.synopsis}</p>
    </div>
  );
};

export default Anime;
