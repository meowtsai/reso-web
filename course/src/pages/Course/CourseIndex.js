import React, { useEffect, Fragment, useState } from "react";
import "./courseA.css";
import Nav from "./Nav";
import Masthead from "./Masthead";
import UserForm from "./UserForm";
import ResultModal from "./ResultModal";
import { useParams } from "react-router-dom";
import axios from "axios";
import ErrorModal from "./ErrorModal";
const CourseIndex = () => {
  let { course_id } = useParams();
  const [courses, setCourses] = useState([
    { id: "A", name: "求生者：遛監管者技巧教學" },
    { id: "B", name: "求生者：對戰觀念教學" },
  ]);

  const [registerResult, setRegisterResult] = useState(null);
  const [error, setError] = useState(null);
  //console.log("error", error);
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "/course/js/scripts.js";
    script.async = true;

    document.body.appendChild(script);

    const getCourse = async () => {
      axios
        .get("/api/course/list")
        .then((res) => {
          setCourses(res.data);
        })
        .catch((err) => {});
    };

    getCourse();

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (courses.length > 0) {
      const title = courses.filter((c) => c.id === course_id)[0]?.name;

      document.title = title;
    }
  }, [courses, course_id]);

  const onRegisterSuccess = (result) => {
    console.log("main result", result);
    setRegisterResult(result);
  };

  if (!(courses.filter((c) => c.id === course_id).length > 0)) {
    return <div>oh hi there.</div>;
  }
  return (
    <Fragment>
      <Nav />
      <Masthead />
      <section className="page-section bg-light" id="course">
        <div className="container">
          <div className="text-center">
            <h2 className="section-heading text-uppercase">
              課程{courses.filter((c) => c.id === course_id)[0].id}
            </h2>
            <h2 className="section-subheading text-muted">
              {courses.filter((c) => c.id === course_id)[0].name}
            </h2>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <UserForm
                setRegisterResult={onRegisterSuccess}
                courseId={course_id}
                setError={(error) => setError(error)}
              />
            </div>
          </div>
        </div>
      </section>
      {registerResult?._id && <ResultModal registerResult={registerResult} />}
      {error && <ErrorModal error={error} />}
    </Fragment>
  );
};

export default CourseIndex;
