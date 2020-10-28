import React, { useEffect } from "react";

const Header = ({ type, info = {} }) => {
  useEffect(() => {
    return () => {};
  }, []);
  return (
    <header className={`masthead ${info ? info.id : ""}`}>
      <div className="container">
        <div className="masthead-subheading">{info.gameName}</div>
        <div className="masthead-heading text-uppercase">
          {info.heading ? info.heading : type === "form" ? "" : "線上訓練班"}
        </div>
        {type === "course" && (
          <>
            <a
              className="btn btn-primary btn-xl text-uppercase js-scroll-trigger"
              href="#course"
            >
              立即預約課程
            </a>
            <button
              type="button"
              className="btn btn-primary btn-xl"
              data-toggle="modal"
              data-target="#Modalnotice"
            >
              匯款成功回報
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
