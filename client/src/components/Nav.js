import React from "react";
import { Link } from "react-router-dom";
const Nav = () => {
  return (
    <nav
      className="navbar navbar-inverse navbar-fixed-top navbar-no-bg"
      role="navigation"
    >
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#top-navbar-1"
          >
            {" "}
            <span className="sr-only"></span> <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>

          <Link to="/" className="navbar-brand" title="首頁" />
        </div>
        <div className="collapse navbar-collapse" id="top-navbar-1">
          <ul className="nav navbar-nav navbar-right">
            <li>
              <Link to="/about" title="關於呼聲">
                關於呼聲
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                href="index.html"
                className=" nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                arssia-expanded="false"
                title="服務項目"
              >
                服務項目 <span className="nav-arrow fa fa-angle-down"></span>{" "}
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <Link
                    to="/match"
                    className="dropdown-item"
                    title="KOL網紅創意服務"
                  >
                    KOL網紅創意服務
                  </Link>
                </li>
                <li>
                  <Link
                    to="/integr"
                    className="dropdown-item"
                    title="全方位整合行銷"
                  >
                    KOL網紅創意服務
                  </Link>
                </li>
                <li>
                  <Link
                    to="/request-service"
                    className="dropdown-item"
                    title="全方位整合行銷"
                  >
                    KOL網紅流量服務
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/kol" title="網紅合作">
                網紅合作
              </Link>
            </li>
            <li>
              <Link to="/contact" title="聯絡呼聲">
                聯絡呼聲
              </Link>
            </li>
            <li>
              <Link to="/service-request" title="我要發案">
                我要發案
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
