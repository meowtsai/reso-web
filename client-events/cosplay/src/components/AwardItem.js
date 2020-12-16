import React from "react";

// import Swiper JS
import SwiperCore, { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
//import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
//import "swiper/components/scrollbar/scrollbar.scss";
import Spinner from "./Spinner";

SwiperCore.use([Pagination]);
const AwardItem = ({ contestant, award, judge1 = "", judge2 = "" }) => {
  return (
    <>
      <img src={`/cosplay/image/award/${award}.png`} />
      <div className="info">
        <p className="author_name">
          ✛投稿暱稱／<span>{contestant.nickname}</span>
        </p>
        <p>
          ✛作品標題／<span>{contestant.work_subject}</span>
        </p>
        <p>
          ✛作品描述／
          <span>{contestant.work_desc}</span>
        </p>
        {judge1 !== "" && (
          <p>
            ✛短評-狂間／
            <span>{judge1}</span>
          </p>
        )}
        {judge2 !== "" && (
          <p>
            ✛短評-竜／
            <span>{judge2}</span>
          </p>
        )}
      </div>
      <Swiper
        pagination={{
          clickable: true,
          renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + "</span>";
          },
        }}
      >
        <SwiperSlide>
          <a href={contestant.cover_img} target="_blank" rel="noreferrer">
            <img src={contestant.cover_img} alt="封面" />
          </a>
        </SwiperSlide>
        {contestant.imgs.map((img, index) => (
          <SwiperSlide key={`${contestant._id}_img${index}`}>
            {" "}
            <a href={img} target="_blank" rel="noreferrer">
              <img src={img} alt="圖片" />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default AwardItem;
