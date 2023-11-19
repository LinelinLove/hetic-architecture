// import React, { useEffect, useState } from "react";
// import InputComponent from "../components/atoms/InputComponent";
// import "./Signup.css";

// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// import { app } from "../firebaseConfig";

// export default function Signup() {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(
//         import.meta.env.VITE_REACT_APP_API_URL +
//           "hetic-architecture/backend/api/signup.php",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(formData),
//         }
//       );

//       const data = await response.json();

//       if (response.ok) {
//         console.log("User registered successfully");

//         // création de l'user dans firebase
//         await handleSignUp(formData.email, formData.password);
//         // Redirigez l'utilisateur vers une page de connexion ou faites autre chose après l'inscription réussie.
//       } else {
//         console.error("Error registering user:", data.message);
//       }

//       console.log(data);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const handleSignUp = async () => {
//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       const user = userCredential.user;
//       console.log("User registered successfully:", user);
//     } catch (error) {
//       console.error("Error registering user:", error);
//     }
//   };

//   return (
//     <div className="gap-10 flex flex-col items-center p-4">
//       <div className="bg-black gap-10 flex flex-col items-center p-10 rounded-xl mt-16">
//         <h1>S'inscrire à Eiga</h1>
//         <form
//           onSubmit={handleSubmit}
//           className="flex flex-col items-center gap-4 w-full"
//         >
//           <InputComponent
//             type="text"
//             placeholder="Pseudo"
//             required={true}
//             name="username"
//             onChange={handleChange}
//           />

//           <InputComponent
//             type="email"
//             placeholder="E-mail"
//             required={true}
//             name="email"
//             onChange={handleChange}
//           />
//           <InputComponent
//             type="password"
//             placeholder="Mot de passe"
//             required={true}
//             name="password"
//             onChange={handleChange}
//           />
//           <button type="submit">S'inscrire</button>
//         </form>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import InputComponent from "../components/atoms/InputComponent";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { app } from "../firebaseConfig";

const auth = getAuth(app);

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Créez l'utilisateur dans votre base de données personnalisée
      const response = await fetch(
        import.meta.env.VITE_REACT_APP_API_URL +
          "hetic-architecture/backend/api/signup.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("User registered in custom database successfully");

        // Maintenant, créez l'utilisateur dans Firebase Authentication
        await handleSignUp(formData.email, formData.password);

        // Redirigez l'utilisateur vers une page de connexion ou faites autre chose après l'inscription réussie.
      } else {
        console.error(
          "Error registering user in custom database:",
          data.message
        );
      }

      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSignUp = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User registered successfully in Firebase:", user);
    } catch (error) {
      console.error("Error registering user in Firebase:", error);
    }
  };

  return (
    <div className="gap-10 flex flex-col items-center p-4">
      <div className="bg-black gap-10 flex flex-col items-center p-10 rounded-xl mt-16">
        <h1>S'inscrire à Eiga</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-4 w-full"
        >
          <InputComponent
            type="text"
            placeholder="Pseudo"
            required={true}
            name="username"
            onChange={handleChange}
          />
          <InputComponent
            type="email"
            placeholder="E-mail"
            required={true}
            name="email"
            onChange={handleChange}
          />
          <InputComponent
            type="password"
            placeholder="Mot de passe"
            required={true}
            name="password"
            onChange={handleChange}
          />
          <button type="submit">S'inscrire</button>
        </form>
      </div>
    </div>
  );
}
