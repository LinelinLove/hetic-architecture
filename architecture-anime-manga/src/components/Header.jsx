// Header.js
import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <nav className="flex flex-row place-content-between bg-blue-100 text-black p-4">
        <div>
          <Link to="/">Eiga Logo</Link>
        </div>
        <ul className="flex flex-row gap-8">
          <li>
            <Link to="/">Accueil</Link>
          </li>
          <li>
            <Link to="/profil">Profil</Link>
          </li>
          <li>
            <Link to="/listAnimes">Liste des animes</Link>
          </li>
          <li>
            <Link to="/settings">Paramètres</Link>
          </li>
          <li>
            <Link to="/login">Se connecter</Link>
          </li>
          <li>
            <Link to="/signup">S'inscrire</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/logout">Déconnexion</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
