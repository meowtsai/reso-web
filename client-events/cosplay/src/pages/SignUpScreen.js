import React from "react";
import { Helmet } from "react-helmet";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ApplyForm from "../components/ApplyForm";

const SignUpScreen = ({ match }) => {
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
        <link rel="stylesheet" type="text/css" href="css/signup.css" />
      </Helmet>

      <Header match={match} />

      {match.params.category.toLowerCase() === "pg" ? (
        <ApplyForm category={"pg"} filesize={4000000} filesCount={9} />
      ) : (
        <ApplyForm category={"cg"} filesize={2000000} filesCount={4} />
      )}

      <Footer />
    </>
  );
};

export default SignUpScreen;
