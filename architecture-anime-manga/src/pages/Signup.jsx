import React from "react";
import InputComponent from "../components/atoms/InputComponent";
import "./Signup.css";

export default function Signup() {
  return (
    <div className="gap-10 flex flex-col items-center p-4">
      <div className="bg-black gap-10 flex flex-col items-center p-10 rounded-xl mt-16">
        <h1>S'inscrire à Eiga</h1>
        <form className="flex flex-col items-center gap-4 w-full" action="">
          {/* <InputComponent type="text" placeholder="Nom" /> */}
          {/* <InputComponent type="text" placeholder="Prénom" /> */}
          <InputComponent type="text" placeholder="Pseudo" />
          <InputComponent type="mail" placeholder="E-mail" />
          {/* <InputComponent type="telephone" placeholder="Téléphone" /> */}
          <InputComponent type="password" placeholder="Mot de passe" />
          <InputComponent
            type="password"
            placeholder="Confirmer mot de passe"
          />
          {/* <InputComponent type="date" placeholder="Date de naissance" /> */}

          {/* <label className="wrapper">
            <input
              type="date"
              required="required"
              className="w-full leading-10 px-4 rounded"
            />
            <span></span>
          </label> */}
          <button>S'inscrire</button>
        </form>
      </div>
    </div>
  );
}
