import React, { useEffect } from "react";
import { WOW } from "wowjs";
const Service = () => {
  useEffect(() => {
    const wow = new WOW({
      offset: 100,
      mobile: false,
      live: false,
    });

    wow.init();
  }, []);
  return (
    <div className="service-container section-container">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 service section-description wow fadeIn">
            <h2>
              <strong>服務</strong> 項目
            </h2>
            <div className="divider-1 wow fadeInUp">
              <span></span>
            </div>
          </div>
        </div>
        <div className="row text">
          <div className="col-sm-4 service-box wow fadeInUp">
            {" "}
            <a href="/match" target="_blank">
              <div className="service-box-icon">
                <i className="fa fa-magic"></i>
              </div>
              <h3>KOL網紅創意服務</h3>
              <p>
                台灣在地市場KOL謀合，依需求提供最佳人選、創意企劃與精準溝通，滿足各項推廣需求。
              </p>
            </a>{" "}
          </div>
          <div className="col-sm-4 service-box wow fadeInDown">
            {" "}
            <a href="/integr" target="_blank">
              <div className="service-box-icon">
                <i className="fa fa-bullhorn"></i>{" "}
              </div>
              <h3>全方位整合行銷</h3>
              <p>專業團隊訂製產品推廣組合，市場分析，提供各類行銷專業意見。</p>
            </a>{" "}
          </div>
          <div className="col-sm-4 service-box wow fadeInUp">
            {" "}
            <a href="/service-request" target="_blank">
              <div className="service-box-icon">
                <i className="fa fa-cogs"></i>
              </div>
              <h3>KOL網紅流量服務</h3>
              <p>
                針對行銷主軸及預算量身打造，網紅組合配套流量推廣，內容口碑推疊，加強整體推廣效果。
              </p>
            </a>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
