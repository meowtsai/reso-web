import React, { Fragment } from "react";

const Section2Schedule = () => {
  return (
    <Fragment>
      <a id="schedule" name="schedule" href="!#">
        {" "}
      </a>
      <section className="sec2">
        <p className="sec-title"></p>
        <div className="schedule-box">
          <ul className="schedule-up">
            <li>
              <p>報名時間</p>
              <p style={{ fontSize: "1.6rem" }}>10月7日-10月21日晚上23:59</p>
              <p>找齊你的隊友一起參加比賽!</p>
            </li>
            <li>
              <p>賽程公布 </p>
              <p>10月22日 </p>
              <p>
                {" "}
                於官網上公布<span style={{ color: "#c31717" }}>賽程表</span>
              </p>
            </li>
          </ul>
          <ul className="schedule-down">
            <li>
              <p>線上預賽 </p>
              <p>10月24日</p>
              <p>
                所有報名隊伍於線上進行
                <br />
                BO1 的單敗淘汰預選賽，直到八強出線。{" "}
              </p>
            </li>
            <li>
              <p>八強賽 </p>
              <p>10月31日</p>
              <p>八強進行 BO3 單敗淘汰賽</p>
              <br />
            </li>
            <li>
              <p>四強賽 </p>
              <p>11月1日</p>
              <p>
                四強進行 BO3 單敗淘汰賽
                <br />
                同時進行轉播{" "}
              </p>
            </li>
            <li>
              <p>冠軍賽 </p>
              <p>11月1日</p>
              <p>
                冠軍賽為 BO5
                <br />
                同時進行轉播{" "}
              </p>
            </li>
          </ul>
        </div>
      </section>
    </Fragment>
  );
};

export default Section2Schedule;
