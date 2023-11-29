import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#1FC0B8] mt-auto clear-both p-4 flex flex-row justify-between items-center">
      <p className="text-black font-medium">&copy; Eiga 2023</p>
      <div className="flex flex-col items-end">
        <Link to="/contact" className="text-black">Contact</Link>
        <Link to="/mentions" className="text-black">Mentions légales</Link>
      </div>
    </footer>
  );
}
