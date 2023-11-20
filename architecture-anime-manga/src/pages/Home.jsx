import React, { useEffect, useState } from "react";
import Affiche from "../components/molecules/Affiche";
import Carousel from "../components/molecules/Carousel";

export default function Home() {
  return (
    <div className="w-full">
      <h1 className="text-orange-800">Eiga</h1>
      <Affiche />
      <Carousel title="Anime populaire" />
    </div>
  );
}
