import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black mt-auto clear-both p-4 flex flex-row justify-between">
      <p>&copy; Eiga 2023</p>
      <div className="flex flex-col items-end">
        <Link to="/contact">Contact</Link>
        <Link to="/mentions">Mentions légales</Link>
      </div>
    </footer>
  );
}
