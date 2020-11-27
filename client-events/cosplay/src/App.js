import React, { Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomeScreen from "./pages/HomeScreen";
import SignUpScreen from "./pages/SignUpScreen";
import ShowCaseScreen from "./pages/ShowCaseScreen";
import ContestantScreen from "./pages/ContestantScreen";
function App() {
  return (
    <Router>
      <Fragment>
        <Route path="/cosplay/" component={HomeScreen} exact />

        <Route
          path="/cosplay/signup/:category"
          component={SignUpScreen}
          exact
        />

        <Route path="/cosplay/showcase/" component={ShowCaseScreen} exact />
        <Route
          path="/cosplay/showcase/:id"
          component={ContestantScreen}
          exact
        />

        <div id="gotop">
          <img src="image/top.png" width="150px;" alt="回到頁首" />
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
