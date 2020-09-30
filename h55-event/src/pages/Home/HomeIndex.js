import React, { Fragment } from "react";
import Header from "./Header";
import Section1Live from "./Section1Live";
import Section2Schedule from "./Section2Schedule";
import Section3Rule from "./Section3Rule";
import Footer from "./Footer";
const HomeIndex = () => {
  return (
    <Fragment>
      <Header />
      <a
        class="match"
        ishow="冠軍獎金40萬"
        href="/idvtwcampus/team"
        target="_blank"
      ></a>
      <Section1Live />
      <Section2Schedule />
      <Section3Rule />
      <Footer />
    </Fragment>
  );
};

export default HomeIndex;
