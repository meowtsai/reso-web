import React, { useEffect } from "react";
import { WOW } from "wowjs";
// import Swiper JS
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";

const KOLRow = ({ title = "YouTuber", data = [], style }) => {
  useEffect(() => {
    const wow = new WOW({
      offset: 100,
      mobile: false,
      live: false,
    });

    wow.init();
  }, []);
  return (
    <div className="kol-container section-container" style={style}>
      <div className="container">
        <div className="row">
          <div className="col-sm-12 kol section-description wow fadeIn">
            <h2 style={{ marginTop: "93px" }}>{title}</h2>
            <div className="divider-1 wow fadeInUp text">
              <span></span>
            </div>
          </div>
        </div>
        <Swiper
          spaceBetween={30}
          slidesPerView={4.5}
          pagination={{ clickable: true }}
        >
          <div className="swiper-wrapper kol-box ">
            {data.map((yt) => (
              <Avatar key={`yt-${yt.title}`} title={yt.title} img={yt.image} />
            ))}
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default KOLRow;

const Avatar = ({ title, img }) => (
  <SwiperSlide className="kol-photo">
    <img src={img} alt={title} title={title} />
    <h4>{title}</h4>
  </SwiperSlide>
);
