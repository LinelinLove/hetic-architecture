import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Contact from "./pages/Contact";
import ListAnimes from "./pages/ListAnimes";
import Settings from "./pages/Settings";
import Profil from "./pages/Profil";
import Mentions from "./pages/Mentions";
import PrivateRoute from "./pages/PrivateRoute";
import { AuthProvider } from "./pages/AuthContext";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route element={<PrivateRoute redirect="/login" />}>
                <Route path="/profil" element={<Profil />} />
              </Route>
              <Route element={<PrivateRoute redirect="/login" />}>
                <Route path="/settings" element={<Settings />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/listAnimes" element={<ListAnimes />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/mentions" element={<Mentions />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}
