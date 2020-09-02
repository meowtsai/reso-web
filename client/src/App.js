import React, { Fragment, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const HomeIndex = React.lazy(() => import("./pages/Home/"));
const KOLIndex = React.lazy(() => import("./pages/KOL/"));
const AboutIndex = React.lazy(() => import("./pages/About/"));
const BlankIndex = React.lazy(() => import("./pages/Blank/"));
const ContactIndex = React.lazy(() => import("./pages/Contact/"));
const MatchIndex = React.lazy(() => import("./pages/Match/"));
const IntegrIndex = React.lazy(() => import("./pages/Integr/"));

const Footer = React.lazy(() => import("./components/Footer"));
const Nav = React.lazy(() => import("./components/Nav"));
//const RequestServiceIndex = React.lazy(() => import("./pages/RequestService"));
//import HomeIndex from "./pages/Home/";
// import AboutIndex from "./pages/About/";
// import KOLIndex from "./pages/KOL/";
// import BlankIndex from "./pages/Blank/";
// import ContactIndex from "./pages/Contact";
// import Footer from "./components/Footer";
// import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <Fragment>
        <Suspense
          fallback={
            <div className="spinner-grow text-warning" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          }
        >
          <Nav />
          <Switch>
            <Route exact path="/">
              <HomeIndex />
            </Route>
            <Route exact path="/about">
              <AboutIndex />
            </Route>
            <Route exact path="/kol">
              <KOLIndex />
            </Route>
            <Route exact path="/contact">
              <ContactIndex />
            </Route>
            <Route exact path="/general">
              <BlankIndex />
            </Route>
            <Route exact path="/match">
              <MatchIndex />
            </Route>
            <Route exact path="/integr">
              <IntegrIndex />
            </Route>
            {/* 
            <Route exact path="/service-request">
              <RequestServiceIndex />
            </Route> */}

            <Route path="*" exact={true} component={BlankIndex} />
          </Switch>
          <Footer />
        </Suspense>

        <div id="gotop">^</div>
      </Fragment>
    </Router>
  );
}

export default App;
