import React, { createContext, useContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebaseConfig";

const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
//   const auth = getAuth(app);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setIsUserLoggedIn(!!user);
//     });

//     return () => unsubscribe();
//   }, [auth]);

//   return (
//     <AuthContext.Provider value={{ isUserLoggedIn }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user, isUserLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
