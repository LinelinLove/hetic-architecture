import React, { useEffect, useState } from "react";
import Affiche from "../components/molecules/Affiche";
import Carousel from "../components/molecules/Carousel";


export default function Home() {
  const [animesSeason, setAnimesSeason] = useState();
  const [animesTop, setAnimesTop] = useState();
  const [getWatchListData, setGetWatchListData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resSeason = await fetch(`https://api.jikan.moe/v4/seasons/now`);
        const dataSeason = await resSeason.json();
        setAnimesSeason(dataSeason.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données des animes de saison",
          error
        );
      }
    };

    const fetchDataTop = async () => {
      try {
        const resTop = await fetch(`https://api.jikan.moe/v4/top/anime`);
        const dataTop = await resTop.json();
        setAnimesTop(dataTop.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données des top animes",
          error
        );
      }
    };

    fetchData();

    // Introduce a delay before making the second request
    const delay = 2000; // 2000 milliseconds (adjust as needed)
    setTimeout(() => {
      fetchDataTop();
    }, delay);
  }, []);

  return (
    <div className="w-full">
      <Affiche data={animesSeason} title={"Animes de saison"} />
      <Carousel data={animesTop} title="Animes populaire" />
    </div>
  );
}
