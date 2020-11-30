import React, { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import Header from "../components/Header";
import ShowContestant from "../components/ShowContestant";
import Footer from "../components/Footer";
import { getLoggedInUser } from "../helpers/authUtils";
const ContestantScreen = ({ match }) => {
  const [userInfo, setUserInfo] = useState(getLoggedInUser());
  const [contestant, setContestant] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getList = async () => {
      setLoading(true);

      axios
        .get(`/api/cosplay/${match.params?.id}`)
        .then((res) => {
          //console.log("res cosplay id", res.data);
          setLoading(false);
          if (res.data) {
            setContestant(res.data);
          }
        })
        .catch((err) => {
          setLoading(false);
          //console.log(err.message);
          //setError(err.message);
        });
    };
    if (match.params?.id) {
      getList();
    }

    return () => {};
  }, []);
  return (
    <>
      <Helmet>
        <meta property="og:title" content={contestant.nickname} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:image" content={contestant.cover_img} />

        <meta
          property="og:site_name"
          content="《第五人格》創意Cosplay大賽-華麗追逐 玩美求生"
        />
        <meta property="og:description" content={contestant.work_desc} />

        <link rel="stylesheet" type="text/css" href="css/list.css" />
        <link rel="stylesheet" type="text/css" href="css/detail.css" />
      </Helmet>

      <Header match={match} />
      <ShowContestant
        id={match.params?.id}
        userInfo={userInfo}
        contestant={contestant}
        setContestant={(cont) => setContestant(cont)}
        loading={loading}
        setLoading={(isLoading) => setLoading(isLoading)}
      />
      <Footer />
    </>
  );
};

export default ContestantScreen;
