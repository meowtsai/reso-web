import React from "react";
import { Helmet } from "react-helmet";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AwardContent from "../components/AwardContent";

const AwardScreen = ({ match }) => {
  return (
    <>
      <Helmet>
        <link rel="stylesheet" type="text/css" href="css/award.css" />
      </Helmet>

      <Header match={match} />
      <AwardContent />

      <Footer />
    </>
  );
};

export default AwardScreen;
