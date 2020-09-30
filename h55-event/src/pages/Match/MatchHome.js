import React, { Fragment, useEffect } from "react";
import Header from "../Home/Header";
import Section1Nav from "../Team/Section1Nav";
import SectionNote from "../Team/SectionNote";
import Section3Flow from "./Section3Flow";
import Form from "./Form";
const MatchHome = () => {
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
      <Section1Nav />
      <SectionNote page={"match"} />
      <Section3Flow />
      <Form />
    </Fragment>
  );
};

export default MatchHome;
