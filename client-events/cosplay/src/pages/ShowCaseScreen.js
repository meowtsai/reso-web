import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import queryString from "query-string";
import Header from "../components/Header";
import ShowList from "../components/ShowList";
import Footer from "../components/Footer";
import {
  getLoggedInUser,
  setLoggedInUser,
  logoutUser,
} from "../helpers/authUtils";

const ShowCaseScreen = ({ match, location, history }) => {
  const [userInfo, setUserInfo] = useState(getLoggedInUser());

  const parsed = queryString.parse(location.search);
  const siteToken = parsed.site_token;
  //const userInfo = getLoggedInUser();

  useEffect(() => {
    const verifyToken = async () => {
      axios
        .post(`/api/cosplay/auth/user`, { siteToken })
        .then((res) => {
          if (res.data) {
            //localStorage.setItem("userInfo", JSON.stringify(data));
            setLoggedInUser(JSON.stringify(res.data));
            setUserInfo(getLoggedInUser());
          }
        })
        .catch((err) => {
          // setLoading(false);
          console.log(err.message);
          //setError(err.message);
        });
    };
    if (siteToken) {
      verifyToken();
    }
  }, [siteToken]);

  return (
    <>
      <Helmet>
        <link rel="stylesheet" type="text/css" href="css/list.css" />
      </Helmet>

      <Header match={match} />
      <ShowList
        userInfo={userInfo}
        logout={() => {
          logoutUser();
          setUserInfo(null);
          history.push("/cosplay/showcase");
        }}
      />
      <Footer />
    </>
  );
};

export default ShowCaseScreen;
