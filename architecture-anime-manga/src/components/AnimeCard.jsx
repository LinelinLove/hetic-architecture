// AnimeCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export const AnimeCard = ({ animelist, setAnimeInfo }) => {
  const navigate = useNavigate();

  const handleAnimeClick = (anime) => {
    // Utilisez navigate pour rediriger l'utilisateur vers la page spécifique de l'anime
    navigate(`/anime/${anime.mal_id}`);

    // Appeler la fonction setAnimeInfo pour mettre à jour les détails de l'anime
    setAnimeInfo(anime);
  };

  return (
    <>
      {animelist
        ? animelist.map((anime, index) => {
            return (
              <div
                className="w-[200px] flex flex-col justify-start gap-2 transition cursor-pointer duration-300 ease-in-out hover:opacity-75 hover:text-blue-500"
                key={index}
                onClick={() => handleAnimeClick(anime)}
              >
                <img
                  src={anime.images.jpg.large_image_url}
                  alt="animeImage"
                  className="w-64 h-[285px] object-cover rounded"
                />
                <div className="text-center">
                  <h4>{anime.title}</h4>
                </div>
              </div>
            );
          })
        : "Pas de résultat"}
    </>
  );
};
