// Header.js
import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav className="flex flex-row place-content-between">
      <div>Eiga Logo</div>
      <ul className="flex flex-row gap-4">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/anime">Anime</Link>
        </li>
        <li>Mon compte</li>
      </ul>
    </nav>
  );
}
