import React from "react";
import classnames from "classnames";
const KolList = () => {
  const list = [
    { title: "這群人TGOP", image: "img/kol-Y/TGOP.jpg" },
    { title: "眾量級CROWD", image: "img/kol-Y/CROWD.jpg" },
    { title: "葉式特工Yes Ranger", image: "img/kol-Y/YesRanger.jpg" },
    { title: "木曜4超玩", image: "img/kol-Y/muyao4.jpg" },
    { title: "吃貨們", image: "img/kol-Y/EatFunnyGirl.jpg" },
    { title: "華森", image: "img/kol-Y/Hanksmkinghw.jpg" },
    { title: "鐵牛", image: "img/kol-Y/ironbull.jpg" },
    { title: "放火", image: "img/kol-Y/louislee0602.jpg" },
  ];

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
        <KolRowForIndexPage kols={list.slice(0, 4)} />
        <KolRowForIndexPage kols={list.slice(4, 8)} />

        <div className="row">
          <div
            className="col-sm-12 section-bottom-button wow fadeInUp"
            style={{ marginBottom: "60px" }}
          >
            {" "}
            <a className="btn-link-2" href="/kol" target="_blank">
              看更多
            </a>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KolList;

const KolRowForIndexPage = ({ kols }) => {
  return (
    <div className="row">
      {kols.slice(0, 4).map((kol, i) => (
        <div
          key={`kolrowindex_${kol.title}`}
          className={classnames(
            "col-sm-3 kol-box wow ",
            {
              fadeInUp: i !== 1,
            },
            {
              fadeInDown: i === 1,
            }
          )}
        >
          <div className="kol-photo">
            {" "}
            <img src={kol.image} alt="" />{" "}
          </div>
          <h4>{kol.title}</h4>
        </div>
      ))}
    </div>
  );
};
