import React from "react";
import { Helmet } from "react-helmet";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FormPG from "../components/FormPG";
import FormCG from "../components/FormCG";
const SignUpScreen = ({ match }) => {
  return (
    <>
      <Helmet>
        <link rel="stylesheet" type="text/css" href="css/signup.css" />
      </Helmet>

      <Header />

      {match.params.category.toLowerCase() === "pg" ? <FormPG /> : <FormCG />}

      <Footer />
    </>
  );
};

export default SignUpScreen;
