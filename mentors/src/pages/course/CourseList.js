import React from "react";
import { Link } from "react-router-dom";
const CourseList = ({ courses, game_id }) => {
  return (
    <section className="page-section bg-light" id="course">
      <div className="container">
        <div className="text-center">
          <h2 className="section-heading text-uppercase">訓練報名</h2>
          <h3 className="section-subheading text-muted">
            請選擇您要預約的課程主題
          </h3>
        </div>
        <div className="row">
          {courses.map((c, index) => (
            <div key={`course_${index}`} className="col-lg-4 col-sm-6 mb-4">
              <div className="course-item">
                {" "}
                <Link
                  className="course-link"
                  to={`/mentors/form/${game_id}/${c._id}`}
                >
                  <div className="course-hover">
                    <div className="course-hover-content">
                      <i className="fas fa-plus fa-3x"></i>
                    </div>
                  </div>
                  <img className="img-fluid" src={c.img} alt={c.desc} />{" "}
                </Link>
                <div className="course-caption">
                  <div className="course-caption-heading">{c.title}</div>
                  <div className="course-caption-subheading text-muted">
                    {c.desc}
                  </div>
                  <span className="price">
                    <span className="amount">NT$ {c.fee}</span>{" "}
                    <small className="duration">┄ {c.time}</small>
                  </span>{" "}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseList;
