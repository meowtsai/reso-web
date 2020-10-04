import React, { Fragment, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const HomeIndex = React.lazy(() => import("./pages/Home/HomeIndex"));
const TeamHome = React.lazy(() => import("./pages/Team/TeamHome"));
const SubmitResult = React.lazy(() => import("./pages/Team/SubmitResult"));
const MatchHome = React.lazy(() => import("./pages/Match/MatchHome"));

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
          <Switch>
            <Route exact path="/idvtwcampus">
              <HomeIndex />
            </Route>
            <Route exact path="/idvtwcampus/team">
              <TeamHome />
            </Route>
            <Route exact path="/idvtwcampus/match">
              <MatchHome />
            </Route>

            <Route exact path="/idvtwcampus/team/result">
              <SubmitResult />
            </Route>
            <Route exact path="/idvtwcampus/match/result">
              <SubmitResult />
            </Route>
          </Switch>
        </Suspense>
        <div id="gotop">^</div>
      </Fragment>
    </Router>
  );
}

export default App;
