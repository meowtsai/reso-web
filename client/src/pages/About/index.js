import React, { useEffect } from "react";
import { WOW } from "wowjs";

const AboutIndex = () => {
  const h2Style = { textTransform: "capitalize", color: "#fff" };
  useEffect(() => {
    const wow = new WOW({
      offset: 100,
      mobile: false,
      live: false,
    });

    wow.init();
  }, []);

  return (
    <div className="about-container about-container">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 about about-description wow fadeIn">
            <h2 style={{ marginTop: "93px" }}>
              <strong>關於</strong> 呼聲
            </h2>
            <div className="divider-1 wow fadeInUp">
              <span></span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 about-box wow fadeInUp text">
            <p>
              面對極度分眾的新市場，Resound呼聲深諳網路發聲與網紅現象崛起的力量。
            </p>
          </div>
        </div>
        <div className="row text" style={{ marginTop: "50px" }}>
          <div className="col-sm-4 service-box wow fadeInUp">
            <h2 style={h2Style}>Aiming</h2>
            <h4>精準商業對接</h4>
            <p>
              <i className="fa fa-arrow-circle-right"></i> KOL{" "}
              <i className="fa fa-arrow-circle-right"></i> 廣告主
            </p>
          </div>
          <div className="col-sm-4 service-box wow fadeInDown">
            <h2 style={h2Style}>Managing</h2>
            <h4>讓KOL專注所長</h4>
            <p>
              <i className="fa fa-arrow-circle-right"></i> 共同成長{" "}
              <i className="fa fa-arrow-circle-right"></i> 共創商機
            </p>
          </div>
          <div className="col-sm-4 service-box wow fadeInUp">
            <h2 style={h2Style}>Polishing</h2>
            <h4>深化KOL/品牌魅力</h4>
            <p>
              <i className="fa fa-arrow-circle-right"></i> 內容創意{" "}
              <i className="fa fa-arrow-circle-right"></i> 內容推廣
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutIndex;
