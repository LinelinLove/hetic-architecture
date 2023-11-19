// import React, { useState } from "react";
// import InputComponent from "../components/atoms/InputComponent";
// import "./Signup.css";

// export default function Login() {
//   const [id, setId] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(
//         import.meta.env.VITE_REACT_APP_API_URL +
//           "hetic-architecture/backend/api/auth.php",
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
//         // Redirigez l'utilisateur vers une page de connexion ou faites autre chose après l'inscription réussie.
//       } else {
//         console.error("Error registering user:", data.message);
//       }

//       console.log(data);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <div className="gap-10 flex flex-col items-center p-4">
//       <div className="bg-black gap-10 flex flex-col items-center p-10 rounded-xl mt-16">
//         <h1>Se connecter à Eiga</h1>
//         <form
//           onSubmit={handleSubmit}
//           className="flex flex-col items-center gap-4 w-full"
//         >
//           <InputComponent
//             type="text"
//             placeholder="E-mail/Pseudo"
//             required={true}
//             id="username"
//             value={id}
//             onChange={(e) => setId(e.target.value)}
//           />
//           <InputComponent
//             type="password"
//             placeholder="Mot de passe"
//             required={true}
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button type="submit">Se connecter</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// Login.jsx
import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { app } from "../firebaseConfig";

const auth = getAuth(app);

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User registered successfully:", user);
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User logged in successfully:", user);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignUp}>Sign Up</button>
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
}
