import React from "react";

export const AnimeCard = ({ animelist, setAnimeInfo }) => {
  return (
    <>
      {animelist
        ? animelist.map((anime, index) => {
            return (
              <div
                className="w-[200px] flex flex-col justify-start gap-2"
                key={index}
                onClick={() => setAnimeInfo(anime)}
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
        : "Not Found"}
    </>
  );
};
