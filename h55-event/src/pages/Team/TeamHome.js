import React, { Fragment, useEffect, useState } from "react";

import Header from "../Home/Header";
import ErrorAlert from "./ErrorAlert";
import Section1Nav from "./Section1Nav";
import SectionNote from "./SectionNote";
import RegisterForm from "./RegisterForm";
import HowToBox from "./HowToBox";
import LoadingWrap from "../../components/LoadingWrap";
const TeamHome = () => {
  const [error, setError] = useState(null);
  const [hint, setHint] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stylelink = document.createElement("link");
    stylelink.rel = "stylesheet";
    stylelink.href = "/idvtwcampus/css/team.css";
    document.head.appendChild(stylelink);

    return () => {
      document.head.removeChild(stylelink);
    };
  }, []);
  return (
    <Fragment>
      <Header />
      {loading && <LoadingWrap />}
      {error && Object.keys(error).length > 0 && (
        <ErrorAlert
          error={error}
          clearError={() => {
            console.log("clear error triggered");
            setError(null);
          }}
        />
      )}
      <Section1Nav />
      <SectionNote />
      <RegisterForm
        setError={(err) => setError(err)}
        setHint={(val) => {
          setHint(val);
        }}
        setLoading={setLoading}
      />
      {hint && <HowToBox clearHint={() => setHint(null)} optionId={hint} />}
    </Fragment>
  );
};

export default TeamHome;
