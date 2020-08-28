import React from "react";
import { Link } from "react-router-dom";
const KolList = () => {
  return (
    <div className="kol-container section-container">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 kol section-description wow fadeIn">
            <h2>
              <strong>網紅</strong> 合作
            </h2>
            <div className="divider-1 wow fadeInUp text">
              <span></span>
            </div>
            <p>
              網羅台灣優質網紅、KOL合作，推廣需求謀合，為客戶個人化規劃合作及推廣時程，打入目標行銷客群，成為客戶的推廣好助力。
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3 kol-box wow fadeInUp">
            <div className="kol-photo">
              {" "}
              <img src="img/kol-Y/TGOP.jpg" alt="" />{" "}
            </div>
            <h4>這群人TGOP</h4>
          </div>
          <div className="col-sm-3 kol-box wow fadeInDown">
            <div className="kol-photo">
              {" "}
              <img src="img/kol-Y/CROWD.jpg" alt="" />{" "}
            </div>
            <h4>眾量級CROWD</h4>
          </div>
          <div className="col-sm-3 kol-box wow fadeInUp">
            <div className="kol-photo">
              {" "}
              <img src="img/kol-Y/YesRanger.jpg" alt="" />{" "}
            </div>
            <h4>葉式特工Yes Ranger</h4>
          </div>
          <div className="col-sm-3 kol-box wow fadeInUp">
            <div className="kol-photo">
              {" "}
              <img src="img/kol-Y/HuangBros.jpg" alt="" />{" "}
            </div>
            <h4>黃氏兄弟</h4>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3 kol-box wow fadeInUp">
            <div className="kol-photo">
              {" "}
              <img src="img/kol-Y/howfun.jpg" alt="" />{" "}
            </div>
            <h4>HowFun</h4>
          </div>
          <div className="col-sm-3 kol-box wow fadeInDown">
            <div className="kol-photo">
              {" "}
              <img src="img/kol-Y/chuchushoe.jpg" alt="" />{" "}
            </div>
            <h4>啾啾鞋</h4>
          </div>
          <div className="col-sm-3 kol-box wow fadeInUp">
            <div className="kol-photo">
              {" "}
              <img src="img/kol-Y/loserZUN.jpg" alt="" />{" "}
            </div>
            <h4>人生肥宅X尊</h4>
          </div>
          <div className="col-sm-3 kol-box wow fadeInUp">
            <div className="kol-photo">
              {" "}
              <img src="img/kol-Y/OnionMan.jpg" alt="" />{" "}
            </div>
            <h4>Onion Man</h4>
          </div>
        </div>
        <div className="row">
          <div
            className="col-sm-12 section-bottom-button wow fadeInUp"
            style={{ marginBottom: "60px" }}
          >
            <Link to="/kol" className="btn-link-2">
              看更多
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KolList;
