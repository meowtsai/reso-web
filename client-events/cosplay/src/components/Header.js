import React from "react";
import { Link, useHistory } from "react-router-dom";
const Header = ({ match }) => {
  let history = useHistory();
  //console.log("header", match);

  //{match.params.category.toLowerCase() === "pg" ? (
  return (
    <header>
      <Link to="/cosplay">
        <img
          alt="報名"
          src="/cosplay/image/link.png"
          style={{ position: "relative", left: "48%", top: "100px" }}
        />{" "}
      </Link>
      <nav className="nav">
        <ul>
          <li className={match?.path.indexOf("signup") > -1 ? "open" : ""}>
            <Link to="/cosplay" id="#tab1">
              <span>
                <p>11/12-12/9</p>
                <p>報名徵集階段</p>
              </span>
            </Link>
          </li>
          <li className={match?.path.indexOf("showcase") > -1 ? "open" : ""}>
            {/* <Link to="" id="#tab2"> */}
            <span
              onClick={() => {
                const voteBegin = new Date("2020-12-11");
                const today = new Date();

                if (today.getTime() < voteBegin.getTime()) {
                  window.alert("敬請期待，預計2020/12/11開放投票喔！");
                  return;
                } else {
                  history.push("/cosplay/showcase/");
                }
              }}
              id="#tab3"
            >
              <p>12/11-12/15</p>
              <p>線上投票階段</p>
            </span>
          </li>
          <li className={match?.path.indexOf("award") > -1 ? "open" : ""}>
            <Link to="/cosplay/award" id="#tab3">
              <span>
                <p>2020/12/16</p>
                <p>得獎公告</p>
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
