// Header.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "../firebaseConfig";
const auth = getAuth(app);

export default function Header() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsUserLoggedIn(!!user); // Met à jour l'état en fonction de la présence de l'utilisateur
    });

    // Nettoyez l'écouteur lorsque le composant est démonté
    return () => unsubscribe();
  }, []); // Assurez-vous de déclencher cet effet une seule fois lors du montage

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
      // Vous pouvez rediriger l'utilisateur vers une page de connexion ou effectuer d'autres actions après la déconnexion.
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

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
            <Link to="/listAnimes">Liste des animes</Link>
          </li>
          {isUserLoggedIn ? (
            <li>
              <Link to="/profil">Profil</Link>
            </li>
          ) : (
            ""
          )}
          {isUserLoggedIn ? (
            <li>
              <Link to="/settings">Paramètres</Link>
            </li>
          ) : (
            ""
          )}
          <li>
            {isUserLoggedIn ? (
              <Link onClick={handleSignOut}>Se déconnecter</Link>
            ) : (
              <Link to="/login">Se connecter</Link>
            )}
          </li>
          {isUserLoggedIn ? (
            ""
          ) : (
            <li>
              <Link to="/signup">S'inscrire</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
