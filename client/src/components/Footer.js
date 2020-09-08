import React, { Fragment, useEffect } from "react";
import { WOW } from "wowjs";
const Footer = () => {
  useEffect(() => {
    const wow = new WOW({
      offset: 100,
      mobile: false,
      live: false,
    });

    wow.init();
  }, []);
  return (
    <Fragment>
      <div className="footer-menu section-container">
        <div className="container">
          <div className="row">
            <div className="col-sm-5 footer-menu-box wow fadeInUp">
              <div>
                <h4>&ensp;關於呼聲</h4>
              </div>
              <p>
                呼聲Resound深諳網路發聲與網紅現象崛起的力量。面對極度分眾的新市場，人人都是某樣人/事/物的粉絲與專家，每個關鍵意見都有期待聆聽的粉絲。
              </p>
            </div>
            <div className="col-sm-3 footer-menu-box wow fadeInDown">
              <div>
                <h4>&ensp;服務項目</h4>
              </div>
              <p>
                <a className="fm" href="/match" target="_blank">
                  KOL創意推廣
                </a>
              </p>
              <p>
                <a className="fm" href="/integr" target="_blank">
                  全方位整合行銷
                </a>
              </p>
              <p>
                <a className="fm" href="/service-request" target="_blank">
                  KOL流量服務
                </a>
              </p>
            </div>
            <div className="col-sm-4 footer-menu-box wow fadeInUp">
              <div>
                <h4>&ensp;聯絡呼聲</h4>
              </div>
              <p>
                <i className="far fa fa-phone" style={{ color: "#fff" }}></i>
                &ensp;02-8667-2598
              </p>
              <p>
                <i className="far fa fa-envelope"></i>&ensp;hi@resound.global
              </p>
              <p>
                <i className="far fa fa-map-marker"></i>
                &ensp;&thinsp;台北市大安區和平東路二段177號9樓
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <div className="container">
          <div className="row">
            <div className="footer-copyright">
              {" "}
              Copyright © 2020 Resound Global CO. 版權所有{" "}
            </div>
          </div>
        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;
