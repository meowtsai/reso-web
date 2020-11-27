import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Header from "../components/Header";
import ShowContestant from "../components/ShowContestant";
import Footer from "../components/Footer";
import { getLoggedInUser } from "../helpers/authUtils";
const ContestantScreen = ({ match }) => {
  const [userInfo, setUserInfo] = useState(getLoggedInUser());
  return (
    <>
      <Helmet>
        <link rel="stylesheet" type="text/css" href="css/list.css" />
        <link rel="stylesheet" type="text/css" href="css/detail.css" />
      </Helmet>

      <Header match={match} />
      <ShowContestant id={match.params?.id} userInfo={userInfo} />
      <Footer />
    </>
  );
};

export default ContestantScreen;
