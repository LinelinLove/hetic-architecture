import React, { useEffect, useState } from "react";
import InputComponent from "../components/atoms/InputComponent";
import "./Signup.css";

export default function Settings() {
  return (
    <div className="gap-10 flex flex-col items-center p-4">
      <div className="bg-black gap-10 flex flex-col items-center p-10 rounded-xl mt-16">
        <h1>Paramètres du compte</h1>
        <form
          // onSubmit={handleSubmit}
          className="flex flex-col items-center gap-4 w-full"
        >
          <InputComponent
            type="text"
            placeholder="Pseudo"
            required={true}
            name="username"
            // onChange={handleChange}
          />
          <InputComponent
            type="email"
            placeholder="E-mail"
            required={true}
            name="email"
            // onChange={handleChange}
          />
          <InputComponent type="text" placeholder="Nom" />
          <InputComponent type="text" placeholder="Prénom" />

          <InputComponent type="telephone" placeholder="Téléphone" />
          <InputComponent
            type="password"
            placeholder="Mot de passe"
            required={true}
            name="password"
            // onChange={handleChange}
          />
          <InputComponent
            type="password"
            placeholder="Confirmer mot de passe"
            required={true}
          />

          <label className="wrapper">
            <input
              type="date"
              required="required"
              className="w-full leading-10 px-4 rounded"
            />
            <span></span>
          </label>
          <button type="submit">Modifier</button>
        </form>
      </div>
    </div>
  );
}
