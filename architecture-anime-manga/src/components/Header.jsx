// Header.js
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../firebaseConfig";
import { useAuth } from "../pages/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./Burger_style.css";

const auth = getAuth(app);

export default function Header() {
  const { isUserLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [isBurger, setIsBurger] = useState(false);
  const location = useLocation();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully");

      // Vous pouvez rediriger l'utilisateur vers une page de connexion ou effectuer d'autres actions après la déconnexion.
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const expandBurger = () => {
    if (isBurger === false) {
      document.getElementById("burgerBox").style.display = "flex";
      setIsBurger(true);
    } else {
      hideBurger();
    }
  };

  const hideBurger = () => {
    document.getElementById("burgerBox").style.display = "none";
    setIsBurger(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const burgerBox = document.getElementById("burgerBox");
      const burgerIcon = document.getElementById("burgerIcon");

      if (
        burgerBox &&
        !burgerBox.contains(event.target) &&
        !burgerIcon.contains(event.target)
      ) {
        hideBurger();
      }
    };

    if (isBurger) {
      document.addEventListener("click", handleClickOutside);
    }

    // Fonction de nettoyage pour supprimer l'écouteur d'événements
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isBurger]);

  useEffect(() => {
    // Fermez le menu burger lors du changement de page
    hideBurger();
  }, [location]); // Écoutez les changements de l'emplacement

  return (
    <header>
      <nav className="flex flex-row place-content-between bg-white text-black p-4 px-36">
        <div>
          <Link to="/" className="flex flex-row gap-x-4 items-center">
            <img
              src="./kitsune-kitsune-png-removebg-preview.png"
              alt=""
              className="w-[50px] h-[50px]"
            />
            <span className="text-3xl Eiga">Eiga</span>
          </Link>
        </div>
        <ul className="flex flex-row gap-8 items-center">
          <li>
            <Link to="./listAnimes">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                style={{ color: "#000000" }}
                size="xl"
                className="cursor-pointer"
              />
            </Link>
          </li>
          <li>
            <FontAwesomeIcon
              icon={faBars}
              size="xl"
              style={{ color: "#000000" }}
              className="cursor-pointer"
              onClick={expandBurger}
              id="burgerIcon"
            />
            <div id="burgerBox" className="container w-60 h-80 right-6 flex ">
              <div className="container-top">
                {isUserLoggedIn ? (
                  <Link to="/profil">Profil</Link>
                ) : (
                  <div>
                    <Link to="/signup">S'inscrire</Link>
                    <Link to="/login">Connexion</Link>
                  </div>
                )}
              </div>

              <div className="container-bottom flex flex-col">
                <Link to="/" className="burger-button">
                  Accueil
                </Link>
                <Link to="/" className="burger-button">
                  Liste des animes
                </Link>
                <Link to="/contact" className="burger-button">
                  Contact
                </Link>
                {isUserLoggedIn ? (
                  <Link onClick={handleSignOut} className="burger-button">
                    Déconnexion
                  </Link>
                ) : (
                  ""
                )}
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}
