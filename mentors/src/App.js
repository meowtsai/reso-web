import React, { Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomeScreen from "./pages/home/HomeScreen";
import CourseScreen from "./pages/course/CourseScreen";
import FormScreen from "./pages/form/FormScreen";
import Testform from "./pages/form/Testform";

function App() {
  return (
    <Router>
      <Fragment>
        <Route path="/mentors" component={HomeScreen} exact />
        <Route path="/mentors/course/:game_id" component={CourseScreen} exact />
        <Route
          path="/mentors/form/:game_id/:course_id"
          component={FormScreen}
          exact
        />
        <Route path="/mentors/test_form" component={Testform} exact />
      </Fragment>
    </Router>
  );
}

export default App;
