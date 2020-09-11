import React from "react";

const Masthead = () => {
  return (
    <header className="masthead">
      <div className="container">
        <div className="masthead-subheading">第五人格</div>
        <div className="masthead-heading text-uppercase">
          追逐競技線上訓練班
        </div>
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
      </div>
    </header>
  );
};

export default Masthead;
