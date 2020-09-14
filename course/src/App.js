import React, { Fragment, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const HomeIndex = React.lazy(() => import("./pages/Home/HomeIndex"));
const CourseIndex = React.lazy(() => import("./pages/Course/CourseIndex"));
const LoginPage = React.lazy(() => import("./pages/Login/LoginPage"));
const RecordsList = React.lazy(() => import("./pages/Login/RecordsList"));

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
            <Route exact path="/course">
              <HomeIndex />
            </Route>
            <Route exact path="/course/login">
              <LoginPage />
            </Route>
            <Route exact path="/course/list">
              <RecordsList />
            </Route>

            <Route exact path="/course/form/:course_id">
              <CourseIndex />
            </Route>
          </Switch>
        </Suspense>
      </Fragment>
    </Router>
  );
}

export default App;
