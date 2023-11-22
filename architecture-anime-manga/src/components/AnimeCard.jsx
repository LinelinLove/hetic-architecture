import React from "react";

export const AnimeCard = ({
  animelist,
  setAnimeInfo,
  animeComponent,
  handleList,
}) => {
  // const AddToList = animeComponent;s
  return (
    <>
      {animelist
        ? animelist.map((anime, index) => {
            return (
              <div
                className="w-[200px] bg-white flex flex-col justify-start"
                key={index}
                onClick={() => setAnimeInfo(anime)}
              >
                <img
                  src={anime.images.jpg.large_image_url}
                  alt="animeImage"
                  className="w-64 h-[285px] object-cover"
                />
                <div className="text-black text-center">
                  <h4>{anime.title}</h4>
                  <div className="overlay" onClick={() => handleList(anime)}>
                    {/* <h4>{anime.title_japanese}</h4> */}
                    {/* <h3>SYNOPSIS</h3>
                    <div className="synopsis">
                      <p>{anime.synopsis}</p>
                    </div> */}
                    {/* <AddToList /> */}
                  </div>
                </div>
              </div>
            );
          })
        : "Not Found"}
    </>
  );
};
