import React, { useEffect } from "react";
import { WOW } from "wowjs";
const Jumbotron = () => {
  useEffect(() => {
    const wow = new WOW({
      offset: 100,
      mobile: false,
      live: false,
    });

    wow.init();
  }, []);
  return (
    <div
      className="top-content"
      style={{ position: "relative", zIndex: "0", background: "none" }}
    >
      <video poster="" playsInline autoPlay muted loop="1">
        <source
          src="https://assets.mixkit.co/videos/preview/mixkit-unknown-man-walking-in-a-dirt-road-23241-large.mp4"
          type="video/mp4"
        />
      </video>
      <div className="inner-bg">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 text">
              <div className="h"></div>
              <h1
                className="wow fadeInLeftBig"
                style={{ textTransform: "capitalize" }}
              >
                自媒崛起的年代
                <br />
                發聲者皆可成媒體
                <br />
                <em>My Voice;My Media</em>
              </h1>
              <div className="description wow fadeInLeftBig">
                <p>
                  人人都是某樣人/事/物的粉絲與專家
                  <br />
                  每個關鍵意見都有期待聆聽的粉絲
                </p>
              </div>
              <div className="h"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jumbotron;
