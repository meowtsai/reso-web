import React, { Fragment, useEffect, useState } from "react";
import Header from "../Home/Header";
import Section1Nav from "../Team/Section1Nav";
import SectionNote from "../Team/SectionNote";
import Section3Flow from "./Section3Flow";
import ErrorAlert from "../Team/ErrorAlert";
import HowToBox from "../Team/HowToBox";
import LoadingWrap from "../../components/LoadingWrap";
import Form from "./Form";
const MatchHome = () => {
  const [error, setError] = useState(null);
  const [hint, setHint] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const stylelink = document.createElement("link");
    stylelink.rel = "stylesheet";
    stylelink.href = "/idvtwcampus/css/user.css";
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
            //console.log("clear error triggered");
            setError(null);
          }}
        />
      )}
      <Section1Nav />
      <SectionNote page={"match"} />
      <Section3Flow />
      <Form
        setWrapError={(err) => setError(err)}
        setHint={(val) => {
          setHint(val);
        }}
        setLoading={setLoading}
      />
      {hint && <HowToBox clearHint={() => setHint(null)} optionId={hint} />}
    </Fragment>
  );
};

export default MatchHome;
