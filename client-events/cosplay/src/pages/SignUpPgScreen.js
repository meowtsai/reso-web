import React from "react";
import { Helmet } from "react-helmet";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FormPG from "../components/FormPG";

const SignUpPgScreen = () => {
  return (
    <>
      <Helmet>
        <link rel="stylesheet" type="text/css" href="css/signup.css" />
      </Helmet>

      <Header />
      <FormPG />

      <Footer />
    </>
  );
};

export default SignUpPgScreen;
