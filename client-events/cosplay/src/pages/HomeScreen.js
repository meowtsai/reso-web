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
        <meta
          property="og:title"
          content="《第五人格》創意Cosplay大賽-華麗追逐 玩美求生"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="網址" />
        <meta property="og:image" content="https://i.imgur.com/KcCrBkD.jpg" />

        <meta
          property="og:site_name"
          content="《第五人格》創意Cosplay大賽-華麗追逐 玩美求生"
        />
        <meta
          property="og:description"
          content="《第五人格》首次舉辦創意Cosplay大賽，邀請偵探們一起發揮創意，化身最愛的角色和我們一起「華麗追逐，玩美求生」！本次賽事分為專業Cos組與低成本創意組，快快報名參與，盡情的展現對角色的熱愛與創造力吧！。"
        />
        <link rel="stylesheet" type="text/css" href="css/home.css" />
        <script src="js/swiper_init.js"></script>
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
