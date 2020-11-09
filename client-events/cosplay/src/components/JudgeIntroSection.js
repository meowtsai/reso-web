import React from "react";

const JudgeIntroSection = () => {
  return (
    <section className="sec2">
      <p className="sec-title"></p>

      <div className="swiper-container">
        <div
          className="parallax-bg"
          style={{ backgroundImage: "url(./image/King.jpg)" }}
          data-swiper-parallax="-23%"
        ></div>
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <div className="title" data-swiper-parallax="-300">
              King/狂間
            </div>
            <div className="text" data-swiper-parallax="-100">
              <p>
                2019《we can live遊戲動漫嘉年華》嘉賓評委
                <br />
                2019《中國國際動漫節》總決賽嘉賓評委
                <br />
                2019《台中國際動漫嘉年華》Coser嘉賓評委
                <br />
                2019《澳洲SMASH!漫展WCS》Coser嘉賓評委
                <br />
                2018《第二屆傳說對決總決賽》Coser嘉賓評委
              </p>
            </div>
          </div>
          <div className="swiper-slide">
            <div
              className="parallax-bg"
              style={{ backgroundImage: "url(./image/garuda.jpg)" }}
              data-swiper-parallax="-23%"
            ></div>
            <div
              className="title"
              data-swiper-parallax="-300"
              data-swiper-parallax-opacity="0"
            >
              竜-garuda
            </div>
            <div className="text" data-swiper-parallax="-100">
              <p>
                2019《we can live遊戲動漫嘉年華》嘉賓評委
                <br />
                2019《Acer x Predator cosplay大賽》評委
                <br />
                2019《2019馬來西亞 coscon》評委
                <br />
                2018《陰陽師百鬼眾魅》季軍{" "}
              </p>
            </div>
          </div>
        </div>

        <div className="swiper-pagination swiper-pagination-white"></div>

        <div className="swiper-button-prev swiper-button-white"></div>
        <div className="swiper-button-next swiper-button-white"></div>
      </div>
      <div className="sec2-img-a">
        <img src="image/a.png" width="220px" alt="" />
      </div>
      <div className="sec2-img-b">
        <img src="image/b.png" width="300px" alt="" />
      </div>
    </section>
  );
};

export default JudgeIntroSection;
