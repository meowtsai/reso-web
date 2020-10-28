import React from "react";
import { Link } from "react-router-dom";
// id: "tomcatjerrymouse",
// name: "湯姆貓與傑利鼠",
// img: "/mentors/assets/img/course/index-05.jpg",
// slogan: "玩命追逐，智慧與意志之戰中獲勝！",
const GameItem = ({ game }) => {
  return (
    <div className="col-lg-4 col-sm-6 mb-4">
      <div className="course-item">
        <Link className="course-link" to={`/mentors/course/${game._id}`}>
          <div className="course-hover">
            <div className="course-hover-content">
              <i className="fas fa-plus fa-3x"></i>
            </div>
          </div>
          <img className="img-fluid" src={game.img} alt="" />
        </Link>
        <div className="course-caption">
          <div className="course-caption-heading">{game.name}</div>
          <div className="course-caption-subheading text-muted">
            {game.slogan}
          </div>
          <Link className="course-link" to={`/mentors/course/${game._id}`}>
            <span className="amount">前往報名</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GameItem;
