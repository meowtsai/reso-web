import React, { Fragment } from "react";
import Jumbotron from "./Jumbotron";
import Service from "./Service";
import KolList from "./KolList";

const HomeIndex = () => {
  return (
    <Fragment>
      <Jumbotron />
      <Service />
      <KolList />
    </Fragment>
  );
};

export default HomeIndex;
