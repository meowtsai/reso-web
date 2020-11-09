import React from "react";
import { Helmet } from "react-helmet";
import Header from "../components/Header";
import ApplySection from "../components/ApplySection";
import EventIntroSection from "../components/EventIntroSection";
import JudgeIntroSection from "../components/JudgeIntroSection";
import NotesSection from "../components/NotesSection";
import Footer from "../components/Footer";

const HomeScreen = () => {
  return (
    <>
      <Helmet>
        <link rel="stylesheet" type="text/css" href="css/home.css" />
      </Helmet>

      <Header />
      <ApplySection />
      <EventIntroSection />
      <JudgeIntroSection />
      <NotesSection />
      <Footer />
    </>
  );
};

export default HomeScreen;
