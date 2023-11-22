import React, { useState, useEffect } from "react";
import { AnimeCard } from "../components/AnimeCard";

export default function ListAnimes() {
  const [search, setSearch] = useState("");
  const [animeData, setAnimeData] = useState();
  const [animeInfo, setAnimeInfo] = useState();

  useEffect(() => {
    const timer = setTimeout(() => {
      getData();
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const getData = async () => {
    const res = await fetch(
      `https://api.jikan.moe/v4/anime?q=${search}&limit=20`
    );
    const resData = await res.json();
    setAnimeData(resData.data);
  };

  return (
    <div className="p-4">
      <div className="search-box">
        <input
          type="search"
          placeholder="Rechercher un anime"
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 rounded my-4 w-full"
          id="search"
        />
      </div>
      <div className="grid grid-cols-grille gap-x-8 pr-4 gap-y-8 justify-between">
        <AnimeCard animelist={animeData} setAnimeInfo={setAnimeInfo} />
      </div>
    </div>
  );
}
