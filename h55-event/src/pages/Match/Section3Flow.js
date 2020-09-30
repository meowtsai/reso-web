import React from "react";

const Section3Flow = () => {
  return (
    <section className="sec3">
      <p className="sec-title"></p>
      <div className="process-box">
        <ul>
          <li>
            <p>填寫媒合資料 </p>
            <p>
              {" "}
              點選現在已經有的選手人數
              <br />
              並且選擇要找尋的隊友類型 <br />
              （監管者或是求生者）{" "}
            </p>
          </li>
          <li>
            <p>等待媒合信件 </p>
            <p>
              {" "}
              等待媒合
              <br />
              我們將寄發媒合信件{" "}
            </p>
          </li>
          <li>
            <p>透過 LINE 聯繫 </p>
            <p>
              {" "}
              在媒合信件中
              <br />
              透過 LINE ID 聯繫你的隊友
              <br />
              並且取得隊友資料{" "}
            </p>
          </li>
          <li>
            <p>點選組隊報名 </p>
            <p>
              {" "}
              湊滿你需要的隊伍人數後
              <br />
              重新前往活動官網
              <br />
              點擊『組隊報名』{" "}
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Section3Flow;
