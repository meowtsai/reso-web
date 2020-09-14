import React, { Fragment, useEffect } from "react";
import Nav from "./Nav";
import Masthead from "./Masthead";
import WireReportForm from "./WireReportForm";
const HomeIndex = () => {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "/course/js/scripts.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <Fragment>
      {" "}
      <Nav> </Nav>
      <Masthead />
      <section className="page-section" id="advantage">
        <div className="container">
          <div className="text-center">
            <h2 className="section-heading text-uppercase">教學優勢</h2>
            <h3 className="section-subheading text-muted">
              由西區親自教授《第五人格》
            </h3>
          </div>
          <div className="row text-center">
            <div className="col-md-4">
              {" "}
              <span className="fa-stack fa-4x">
                {" "}
                <i className="fas fa-circle fa-stack-2x text-primary"></i>{" "}
                <i className="fas fa-crosshairs fa-stack-1x fa-inverse"></i>{" "}
              </span>
              <h4 className="my-3">逃脫技巧講解</h4>
              <p className="text-muted">
                TIP 求生者全逃脫技巧
                <br />
                一步步教會你怎麼遛好遛滿監管者！
              </p>
            </div>
            <div className="col-md-4">
              {" "}
              <span className="fa-stack fa-4x">
                {" "}
                <i className="fas fa-circle fa-stack-2x text-primary"></i>{" "}
                <i className="fas fa-lightbulb fa-stack-1x fa-inverse"></i>{" "}
              </span>
              <h4 className="my-3">觀念教學養成</h4>
              <p className="text-muted">
                {" "}
                TIP 全局對戰觀念教學
                <br />
                與隊友合力破譯，團隊合作，拿下勝利！
              </p>
            </div>
            <div className="col-md-4">
              {" "}
              <span className="fa-stack fa-4x">
                {" "}
                <i className="fas fa-circle fa-stack-2x text-primary"></i>{" "}
                <i className="fas fa-chart-bar fa-stack-1x fa-inverse"></i>{" "}
              </span>
              <h4 className="my-3">線上實際對戰</h4>
              <p className="text-muted">
                一局結束後
                <br />
                西區將針對該局進行分析與教學
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- 訓練報名--> */}
      <section className="page-section bg-light" id="course">
        <div className="container">
          <div className="text-center">
            <h2 className="section-heading text-uppercase">訓練報名</h2>
            <h3 className="section-subheading text-muted">
              請選擇您要預約的課程主題
            </h3>
          </div>
          <div className="row">
            <div className="col-lg-4 col-sm-6 mb-4">
              <div className="course-item">
                {" "}
                <a className="course-link" href="/course/form/A">
                  <div className="course-hover">
                    <div className="course-hover-content">
                      <i className="fas fa-plus fa-3x"></i>
                    </div>
                  </div>
                  <img
                    className="img-fluid"
                    src="/course/assets/img/course/01.jpg"
                    alt=""
                  />{" "}
                </a>
                <div className="course-caption">
                  <div className="course-caption-heading">課程A</div>
                  <div className="course-caption-subheading text-muted">
                    求生者：遛監管者技巧教學
                  </div>
                  <span className="price">
                    <span className="amount">NT$ 500</span>{" "}
                    <small className="duration">┄ 1 小時</small>
                  </span>{" "}
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 mb-4">
              <div className="course-item">
                {" "}
                <a className="course-link" href="/course/form/B">
                  <div className="course-hover">
                    <div className="course-hover-content">
                      <i className="fas fa-plus fa-3x"></i>
                    </div>
                  </div>
                  <img
                    className="img-fluid"
                    src="/course/assets/img/course/02.jpg"
                    alt=""
                  />{" "}
                </a>
                <div className="course-caption">
                  <div className="course-caption-heading">課程B</div>
                  <div className="course-caption-subheading text-muted">
                    求生者：對戰觀念教學
                  </div>
                  <span className="price">
                    <span className="amount">NT$ 500</span>{" "}
                    <small className="duration">┄ 1 小時</small>
                  </span>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- 關於師資--> */}
      <section className="page-section" id="teachers">
        <div className="container">
          <div className="text-center">
            <h2 className="section-heading text-uppercase">關於師資</h2>
            <h3 className="section-subheading text-muted">
              來認識厲害的講師陣容吧!
            </h3>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="team-member">
                {" "}
                <img
                  className="mx-auto rounded-circle"
                  src="/course/assets/img/team/1.png"
                  alt=""
                />
                <h4>Cqi西區</h4>
                <p className="text-muted">
                  競技類遊戲資深玩家 | Facebook簽約實況主
                </p>
                <a
                  rel="noopener noreferrer"
                  className="btn btn-dark btn-social mx-2"
                  href="https://www.youtube.com/channel/UCCSGfsiVc5DRzxwohAf6uIw?view_as=subscriber"
                  target="_blank"
                >
                  <i className="fab fa-youtube-square" title="Youtube"></i>
                </a>{" "}
                <a
                  rel="noopener noreferrer"
                  className="btn btn-dark btn-social mx-2"
                  href="https://www.facebook.com/Cqi-%E8%A5%BF%E5%8D%80-1857651841197281/?modal=admin_todo_tour"
                  target="_blank"
                >
                  <i className="fab fa-facebook-f" title="Facebook"></i>
                </a>{" "}
                <a
                  rel="noopener noreferrer"
                  className="btn btn-dark btn-social mx-2"
                  href="https://www.instagram.com/anzu924718/"
                  target="_blank"
                >
                  <i className="fab fa-instagram" title="Instagram"></i>
                </a>{" "}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- 如何預約--> */}
      <section className="page-section bg-light" id="description">
        <div className="container">
          <div className="text-center">
            <h2 className="section-heading text-uppercase">相關說明</h2>
            <h3 className="section-subheading text-muted">
              報名前請詳細閱讀相關說明
            </h3>
          </div>
          <div className="row">
            <div className="media-container" style={{ padding: "0 25px" }}>
              <div>
                <h2 className="item-title">適合對象</h2>
                <div className="item-desc">
                  <p>
                    ✦對《第五人格》有興趣、想要精進自己的遊戲觀念，卻不知道從何入手的你。
                    <br />
                    ✦很想成為像Cqi西區一樣厲害的《第五人格》實況主。
                    <br />
                    ✦想成為場上的MVP，帶領大家羸得勝利，讓更多人看到自己。
                  </p>
                </div>
                <h2 className="item-title">步驟說明</h2>
                <div className="item-desc">
                  <p>
                    ✦步驟1 ‒ 於本網頁完成預約。
                    <br />
                    ✦步驟2 ‒ 完成預約後，於3天內匯款費用。
                    <br />
                    ✦步驟3 ‒ 確認匯款成功，加入西區教練班Discord群組。
                    <br />
                    ✦步驟4 ‒ 於指定日期與時段上線
                    (請確保已有手機/PC裝置、安裝第五人格遊戲並已創立遊戲帳號)
                    將使用Discord語音功能溝通組隊，由西區帶練。
                    <br />
                    ✦步驟5 ‒
                    組隊的過程中，學員可以錄影，在一局結束後，將錄影內容提供西區，西區將針對您的錄影內容以及您的實際操作進行解說和建議。
                    <br />
                    ✦步驟6 ‒ 滿滿收穫! 快樂的結束課程。
                  </p>
                </div>
                <h2 className="item-title">注意事項</h2>
                <div className="item-desc">
                  <p>
                    ✦若成功預約並完成付款，將不退費且無法更改預約日期，請務必確認再預約。
                    <br />
                    ✦同一時段課程最多會有4名學員共同進行。
                    <br />
                    ✦如果對本課程有任何疑問，請至西區官方粉專私訊聯繫。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Footer--> 
<!--footer className="footer py-4"> */}
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-12 text-lg-center">Copyright © 2020</div>
        </div>
      </div>
      {/* </footer-->  */}
      {/* <!--匯款回報Modalnotice--> */}
      <WireReportForm />
    </Fragment>
  );
};

export default HomeIndex;
