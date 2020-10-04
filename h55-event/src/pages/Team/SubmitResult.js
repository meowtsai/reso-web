import React, { Fragment, useEffect } from "react";
import Header from "../Home/Header";
import { useLocation } from "react-router-dom";
const SubmitResult = () => {
  let location = useLocation();

  useEffect(() => {
    const stylelink = document.createElement("link");
    stylelink.rel = "stylesheet";
    stylelink.href = "/idvtwcampus/css/team.css";
    document.head.appendChild(stylelink);

    return () => {
      document.head.removeChild(stylelink);
    };
  }, []);
  return (
    <Fragment>
      <Header />
      <section className="sec" style={{ marginTop: 5 }}>
        <div className="attention-box">
          <p>
            ※
            {location.pathname.indexOf("match") > -1
              ? "媒合報名表已經送出，感謝您，請耐心等候我們發送符合您需求的媒合名單。"
              : "報名表已經送出,感謝您，我們會再審核之後於預定日期公布賽程表。"}
            <br />
            若有任何疑問或是更新也會透過mail通知您
            <br />
            <br />
            <a href="/idvtwcampus">
              <span role="img" aria-label="point-to-home">
                ➡️
              </span>
              首頁{" "}
            </a>{" "}
            　
            <a href="/idvtwcampus#schedule">
              <span role="img" aria-label="point-to-schedule">
                ➡️
              </span>
              賽程簡介
            </a>{" "}
            　
            <a href="/idvtwcampus#rule">
              <span role="img" aria-label="point-to-rule">
                ➡️
              </span>
              賽事規則
            </a>
            <br />
            <br />
          </p>
        </div>
      </section>
    </Fragment>
  );
};

export default SubmitResult;
