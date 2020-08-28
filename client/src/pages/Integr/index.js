import React, { Fragment, useEffect } from "react";
import { WOW } from "wowjs";
import "./integr.css";
const IntegrIndex = () => {
  useEffect(() => {
    const wow = new WOW({
      offset: 100,
      mobile: false,
      live: true,
    });

    wow.init();
  }, []);
  return (
    <Fragment>
      {/* <!-- 全方位整合行銷 --> */}
      <div className="service-container section-container">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 service section-description wow fadeIn">
              <h2 style={{ marginTop: "93px" }}>
                <strong>全方位</strong> 整合行銷
              </h2>
              <div className="divider-1 wow fadeInUp">
                <span></span>
              </div>
              <p>
                台灣在地行銷經驗超過15年，與時並進，累積專業強大合作夥伴鏈，提供精準建議，降低客戶行銷及管控成本，順利達成推廣目標。
              </p>
            </div>
          </div>
          <div className="row objective">
            <div className="col-sm-12">
              <ul>
                <li>市場行銷</li>
                <p>產品策略行銷企劃及執行 | 行銷顧問 | 市場調查 | 競品分析</p>
                <li>媒體企劃及採購</li>
                <p>行動網路廣告 | 電視廣告 | 戶外廣告</p>
                <li>公關活動</li>
                <p>新品發表 | 記者會 | 大型展覽 | 地推活動 | 網路節目</p>
                <li>廣告製作</li>
                <p>網路影音廣告 | 遊戲畫面 | 動畫剪接 | 平面設計 | 電視廣告</p>
                <li>網頁相關</li>
                <p>網站建置 | 前端開發 | 網頁設計</p>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* 
<!-- 服務項目 --> */}
      <div
        className="service-container section-container"
        style={{ backgroundColor: "#fdd108" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-sm-12 service section-description wow fadeIn">
              <h2>
                <strong>附加</strong> 服務+
              </h2>
              <div className="divider-1 wow fadeInUp">
                <span></span>
              </div>
            </div>
          </div>
          <div className="row text">
            <div className="col-sm-4 service-box1 wow fadeInUp">
              <div className="service-box-icon">
                <i className="fa fa-user"></i>
              </div>
              <h3>代言人/網紅洽談</h3>
              <p></p>
            </div>
            <div className="col-sm-4 service-box1 wow fadeInDown">
              <div className="service-box-icon">
                <i className="fa fa-thumbs-o-up"></i>{" "}
              </div>
              <h3>社群操作</h3>
              <p></p>
            </div>
            <div className="col-sm-4 service-box1 wow fadeInUp">
              <div className="service-box-icon">
                <i className="fa fa-envelope"></i>
              </div>
              <h3>異業合作接洽</h3>
              <p></p>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- 關於呼聲 --> */}
      <div className="service-container section-container">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 service section-description wow fadeIn">
              <h2 style={{ marginTop: "60px" }}>
                <strong>營銷</strong> 聯繫
              </h2>
              <div className="divider-1 wow fadeInUp">
                <span></span>
              </div>
              <p>
                深入了解產品，為客戶量身打造最佳傳播方案，從行銷策略到廣告活動執行，提供一條龍服務。
              </p>
            </div>
          </div>
          <div className="row product">
            <div className="col-sm-6">
              <ul>
                <li>
                  <i className="fa fa-bullseye" aria-hidden="true"></i>{" "}
                  媒體/新媒體供應商
                </li>
                <li>
                  <i className="fa fa-bullhorn" aria-hidden="true"></i>{" "}
                  活動執行公司
                </li>
                <li>
                  <i className="fa fa-users" aria-hidden="true"></i>{" "}
                  社群網路行銷公司
                </li>
                <li>
                  <i className="fa fa-html5" aria-hidden="true"></i>{" "}
                  平面設計/網頁製作團隊
                </li>
              </ul>
            </div>
            <div className="col-sm-6">
              <ul>
                <li>
                  <i className="fa fa-picture-o" aria-hidden="true"></i>{" "}
                  廣告製作公司
                </li>
                <li>
                  <i className="fa fa-video-camera" aria-hidden="true"></i>{" "}
                  攝影/影像工作室
                </li>
                <li>
                  <i className="fa fa-line-chart" aria-hidden="true"></i>{" "}
                  市調公司
                </li>
                <li>
                  <i className="fa fa-eye" aria-hidden="true"></i> 異業品牌廠商
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default IntegrIndex;
