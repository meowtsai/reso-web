import React, { useEffect } from "react";
import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import GameListSection from "./GameListSection";

const HomeScreen = () => {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "/mentors/js/scripts.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <>
      <NavBar />
      <Header />
      <GameListSection />
    </>
  );
};

export default HomeScreen;
