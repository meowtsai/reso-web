import React, { Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomeScreen from "./pages/HomeScreen";
import SignUpPgScreen from "./pages/SignUpPgScreen";

function App() {
  return (
    <Router>
      <Fragment>
        <Route path="/cosplay/" component={HomeScreen} exact />

        <Route path="/cosplay/signup-pg" component={SignUpPgScreen} exact />
        <div id="gotop">
          <img src="image/top.png" width="150px;" alt="回到頁首" />
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
