// import React from "react";
// import { Link } from "react-router-dom";

// export default function Footer() {
//   return (
//     <footer className="bg-[#1FC0B8] mt-auto clear-both p-4 flex flex-row justify-between items-center">
//       <p className="text-black font-medium">&copy; Eiga 2023</p>
//       <div className="flex flex-col items-end">
//         <Link to="/contact" className="text-black">Contact</Link>
//         <Link to="/mentions" className="text-black">Mentions légales</Link>
//       </div>
//     </footer>
//   );
// }
import React from "react";

const EntrepriseContact = () => {
  const entrepriseInfo = {
    nom: "Eiga",
    adresse: "123 Rue de la Fleur",
    telephone: "01 23 45 67 89",
    siret: "123 456 789 00001",
    email: "contact@eiga.com",
  };

  const footerStyle = {
    backgroundColor: "#333",
    color: "#fff",
    padding: "30px",
    textAlign: "center",
    width: "100%",
    marginTop: "40px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    boxSizing: "border-box",
    height: "auto",
  };

  const lineStyle = {
    marginTop: "2.5px",
    marginBottom: "5px",
    display: "block",
  };

  const headingStyle = {
    marginBottom: "40px",
  };

  return (
    <div>
      <div style={footerStyle}>
        <h2 style={headingStyle}>CONTACTEZ-NOUS</h2>
        <span style={lineStyle}>SIRET: {entrepriseInfo.siret}</span>
        <span style={lineStyle}>{entrepriseInfo.telephone}</span>
        <span style={lineStyle}>{entrepriseInfo.email}</span>

        <p>&copy; 2023 Eiga. Tous droits réservés.</p>
      </div>
    </div>
  );
};

export default EntrepriseContact;
