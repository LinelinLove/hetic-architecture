// Header.js
import React from "react";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../firebaseConfig";
import { useAuth } from "../pages/AuthContext";
const auth = getAuth(app);

export default function Header() {
  const { isUserLoggedIn } = useAuth();

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
        <ul className="flex flex-row gap-8 items-center">
          <li>
            <Link to="/">Accueil</Link>
          </li>
          <li>
            <Link to="/listAnimes">Rechercher un anime</Link>
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
