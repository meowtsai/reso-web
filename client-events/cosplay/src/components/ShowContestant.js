import React, { useEffect, useState } from "react";
import axios from "axios";
// import Swiper JS
import SwiperCore, { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/swiper.scss";
//import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
//import "swiper/components/scrollbar/scrollbar.scss";
import Spinner from "./Spinner";

SwiperCore.use([Pagination]);
const ShowContestant = ({ id, userInfo }) => {
  const [loading, setLoading] = useState(false);
  const [contestant, setContestant] = useState({});

  //console.log("contestant", contestant);

  useEffect(() => {
    const getList = async () => {
      setLoading(true);

      axios
        .get(`/api/cosplay/${id}`)
        .then((res) => {
          setLoading(false);
          if (res.data) {
            setContestant(res.data);
          }
        })
        .catch((err) => {
          setLoading(false);
          //console.log(err.message);
          //setError(err.message);
        });
    };
    getList();
    return () => {};
  }, []);

  const vote = (coser_id) => {
    if (!userInfo || !userInfo.token) {
      window.alert("請先登入喔!");
      return;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    axios
      .post(`/api/cosplay/event/vote`, { coser_id, action: "vote" }, config)
      .then((res) => {
        setLoading(false);
        if (res.data) {
          if (contestant._id === res.data.event) {
            setContestant({
              ...contestant,
              voteCount: contestant.voteCount + 1,
            });
          }

          window.alert("投票成功");
        }
      })
      .catch((err) => {
        setLoading(false);

        window.alert("投票未完成:" + err.response.data.message);
        console.log(err);
        //setError(err.message);
      });
  };

  const shareIt = (_id) => {
    window.FB.ui(
      {
        display: "popup",
        method: "share",
        href: `https://www.resound.global/cosplay/showcase/${_id}`,
      },
      (response) => {
        console.log("share response", response);
      }
    );
  };

  if (loading || !contestant._id) {
    return <Spinner />;
  }

  return (
    <section className="sec4">
      <div className="page details">
        <div className="inner">
          <p className="number">
            作品編號：<span>{contestant._id}</span>
          </p>
          <h2>{contestant.work_subject}</h2>
          <div className="info">
            <p className="author_name">
              暱稱：<span>{contestant.nickname}</span>
            </p>
            <p>
              <span className="bold">作品描述：</span>
              {contestant.work_desc}
            </p>
          </div>
          <div className="vote">
            <p>{contestant.voteCount}</p>
          </div>

          <Swiper
            pagination={{
              clickable: true,
              renderBullet: function (index, className) {
                return (
                  '<span class="' + className + '">' + (index + 1) + "</span>"
                );
              },
            }}
          >
            <SwiperSlide>
              <img src={contestant.cover_img} />
            </SwiperSlide>
            {contestant.imgs.map((img, index) => (
              <SwiperSlide key={`${contestant._id}_img${index}`}>
                {" "}
                <img src={img} />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="btn2">
            {" "}
            <a
              href="javascript:;"
              title="vote"
              data-id="1"
              onClick={() => vote(contestant._id)}
            >
              投票
            </a>{" "}
            <a
              href="javascript:;"
              onClick={() => shareIt(contestant._id)}
              title="facebook"
              className="share_fb"
            >
              分享
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowContestant;
