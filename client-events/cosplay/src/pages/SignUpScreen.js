import React from "react";
import { Helmet } from "react-helmet";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ApplyForm from "../components/ApplyForm";
import FormCG from "../components/FormCG";
const SignUpScreen = ({ match }) => {
  return (
    <>
      <Helmet>
        <link rel="stylesheet" type="text/css" href="css/signup.css" />
      </Helmet>

      <Header />

      {match.params.category.toLowerCase() === "pg" ? (
        <ApplyForm category={"pg"} filesize={4000000} filesCount={9} />
      ) : (
        <ApplyForm category={"cg"} filesize={2000000} filesCount={4} />
      )}

      <Footer />
    </>
  );
};

export default SignUpScreen;
