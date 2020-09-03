import React from "react";

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

          <a href="/" className="navbar-brand" title="首頁">
            {" "}
          </a>
        </div>
        <div className="collapse navbar-collapse" id="top-navbar-1">
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="/about" title="關於呼聲">
                關於呼聲
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                href="/"
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
                  <a
                    href="/match"
                    className="dropdown-item"
                    title="KOL網紅創意服務"
                  >
                    KOL網紅創意服務
                  </a>
                </li>
                <li>
                  <a
                    href="/integr"
                    className="dropdown-item"
                    title="全方位整合行銷"
                  >
                    全方位整合行銷
                  </a>
                </li>
                <li>
                  <a
                    href="/request-service"
                    className="dropdown-item"
                    title="KOL網紅流量服務"
                  >
                    KOL網紅流量服務
                  </a>
                </li>
              </ul>
            </li>

            <li>
              <a href="/kol" title="網紅合作">
                網紅合作
              </a>
            </li>
            <li>
              <a href="/contact" title="聯絡呼聲">
                聯絡呼聲
              </a>
            </li>
            <li>
              <a href="/service-request" title="我要發案">
                我要發案
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
