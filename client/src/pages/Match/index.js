import React, { useEffect } from "react";
import { WOW } from "wowjs";
import "./match.css";
const MatchIndex = () => {
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
            <h2 style={{ marginTop: "93px" }}>
              <strong>KOL媒合</strong> 服務
            </h2>
            <div className="divider-1 wow fadeInUp">
              <span></span>
            </div>
            <p>
              台灣在地市場網紅、KOL、COSER專業而精準的溝通媒合，累積市場經驗15年，直接而有效的業務溝通，快速提供人選報價，行銷操作整合把關，確保網紅合作品質，滿足各項推廣需求。
            </p>
          </div>
        </div>
        <section className="page-section section-container">
          <div className="container">
            <ul className="timeline">
              <li>
                <div className="timeline-image">
                  <img
                    className="rounded-circle img-fluid"
                    src="img/rocedure/1.jpg"
                    alt=""
                  />
                </div>
                <div className="timeline-panel">
                  <div className="timeline-heading">
                    <h4>需求接洽</h4>
                    <h4 className="subheading">Demand contact</h4>
                  </div>
                </div>
              </li>
              <li className="timeline-inverted">
                <div className="timeline-image">
                  <img
                    className="rounded-circle img-fluid"
                    src="img/rocedure/2.jpg"
                    alt=""
                  />
                </div>
                <div className="timeline-panel">
                  <div className="timeline-heading">
                    <h4>人選提案</h4>
                    <h4 className="subheading">Candidate proposal</h4>
                  </div>
                </div>
              </li>
              <li>
                <div className="timeline-image">
                  <img
                    className="rounded-circle img-fluid"
                    src="img/rocedure/3.jpg"
                    alt=""
                  />
                </div>
                <div className="timeline-panel">
                  <div className="timeline-heading">
                    <h4>確認及報價</h4>
                    <h4 className="subheading">Confirmation and quotation</h4>
                  </div>
                </div>
              </li>
              <li className="timeline-inverted">
                <div className="timeline-image">
                  <img
                    className="rounded-circle img-fluid"
                    src="img/rocedure/4.jpg"
                    alt=""
                  />
                </div>
                <div className="timeline-panel">
                  <div className="timeline-heading">
                    <h4>整合溝通</h4>
                    <h4 className="subheading">Integrated communication</h4>
                  </div>
                </div>
              </li>
              <li>
                <div className="timeline-image">
                  <img
                    className="rounded-circle img-fluid"
                    src="img/rocedure/5.jpg"
                    alt=""
                  />
                </div>
                <div className="timeline-panel">
                  <div className="timeline-heading">
                    <h4>成品驗收</h4>
                    <h4 className="subheading">Finished product acceptance</h4>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MatchIndex;
