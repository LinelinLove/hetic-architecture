import React, { useEffect, useState } from "react";
import Header from "../components/header";

export default function Home() {
  const [anime, setAnime] = useState("");
  const [input, setInput] = useState("");
  const [post, setPost] = useState("");
  const [isDisplay, SetIsDisplay] = useState(false);

  useEffect(() => {}, []);

  function saveInput(e) {
    setInput(e.target.value);
  }

  function sendInput() {
    fetch("http://localhost:3000/backend", {
      method: "POST",
      body: JSON.stringify(input),
    })
      .then((res) => res.json())
      .then((data) => setPost(data));
  }

  function afficherAnime() {
    if (isDisplay === false) {
      SetIsDisplay(true);
      fetch("http://localhost:3000/backend")
        .then((res) => res.json())
        .then((data) => setAnime(data));
    } else {
      SetIsDisplay(false);
      setAnime("");
    }
  }

  return (
    <div className="w-full">
      <h1 className="text-orange-800">Eiga</h1>
      <p>{post.title}</p>
      <input type="text" name="" id="" onChange={saveInput} />{" "}
      <button onClick={sendInput}>Post bouton</button>
      <button onClick={afficherAnime}>Cliquer ici</button>
      <h1 className="text-3xl font-bold underline">{anime.title}</h1>
    </div>
  );
}
