import React, { useState, useEffect } from "react";
import { AnimeCard } from "../components/AnimeCard";

export default function ListAnimes() {
  const [search, setSearch] = useState("");
  const [animeData, setAnimeData] = useState();
  const [animeInfo, setAnimeInfo] = useState();
  const [myAnimeList, setMyAnimeList] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      getData();
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const addTo = (anime) => {
    const index = myAnimeList.findIndex((myanime) => {
      return myanime.mal_id === anime.mal_id;
    });
    if (index < 0) {
      const newArray = [...myAnimeList, anime];
      setMyAnimeList(newArray);
    }
  };

  const removeFrom = (anime) => {
    const newArray = myAnimeList.filter((myanime) => {
      return myanime.mal_id !== anime.mal_id;
    });
    setMyAnimeList(newArray);
  };

  const getData = async () => {
    const res = await fetch(
      `https://api.jikan.moe/v4/anime?q=${search}&limit=20`
    );
    const resData = await res.json();
    setAnimeData(resData.data);
  };

  return (
    <div className="p-4">
      <div className="header">
        <div className="search-box">
          <input
            type="search"
            placeholder="Rechercher un anime"
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 rounded my-4 w-full"
          />
        </div>
      </div>

      <div className="container">
        <div className="animeInfo">
          {/* {animeInfo && <AnimeInfo animeInfo={animeInfo} />} */}
        </div>
        <div className="flex gap-4 flex-wrap">
          <AnimeCard
            animelist={animeData}
            setAnimeInfo={setAnimeInfo}
            handleList={(anime) => addTo(anime)}
          />
        </div>
      </div>
    </div>
  );
}
