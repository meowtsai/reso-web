import React from "react";

const Nav = () => {
  return (
    <nav
      className={`navbar navbar-expand-lg navbar-dark fixed-top`}
      id="mainNav"
    >
      <div className="container">
        <button
          className="navbar-toggler navbar-toggler-right"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          {" "}
          <i className="fas fa-bars ml-1"></i>{" "}
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav text-uppercase ml-auto">
            <li className="nav-item">
              <a className="nav-link js-scroll-trigger" href="#advantage">
                教學優勢
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link js-scroll-trigger" href="#course">
                訓練報名
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link js-scroll-trigger" href="#teachers">
                關於師資
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link js-scroll-trigger" href="#description">
                相關說明
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
