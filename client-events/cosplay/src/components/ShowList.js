import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { getFbLoginUrl } from "../helpers/authUtils";
import Spinner from "./Spinner";
const ShowList = ({ userInfo, logout }) => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [workList, setWorkList] = useState([]);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const [keyword, setKeyword] = useState("");
  const [sortBy, setSortBy] = useState("time");
  const [gotoPage, setGotoPage] = useState(page);

  const pageSize = 9;

  useEffect(() => {
    const getList = async () => {
      setLoading(true);

      axios
        .get(`/api/cosplay`)
        .then((res) => {
          setLoading(false);
          if (res.data) {
            setList(res.data);
            setWorkList(res.data);
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

  useEffect(() => {
    setWorkList(
      list
        .filter(
          (item) =>
            (keyword === ""
              ? item
              : item.nickname.indexOf(keyword) > -1 ||
                item.work_subject.indexOf(keyword) > -1) &&
            (category === "" ? item : item.category === category)
        )
        .sort((a, b) => {
          if (sortBy === "vote") {
            return b.voteCount - a.voteCount;
          } else {
            return a._id > b._id;
          }
        })
    );
  }, [keyword, category, sortBy, list]);

  const vote = (coser_id) => {
    if (!userInfo || !userInfo.token) {
      window.alert("請先登入喔!");
      window.location.href = getFbLoginUrl();
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
          console.log(res.data);
          const newList = list.map((item) =>
            item._id === res.data.event
              ? { ...item, voteCount: item.voteCount + 1 }
              : item
          );

          setList(newList);

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
        href: `https://www.resound.global//fbshare/${_id}`,
      },
      (response) => {
        console.log("share response", response);
      }
    );
  };

  const Pagination = ({ pageCount }) => {
    //console.log("pageCount", pageCount);
    return (
      <div id="pager">
        <span
          className="front-page disabled"
          data-type="first"
          data-num="1"
          onClick={() => setPage(1)}
        >
          首頁
        </span>{" "}
        <span
          className="front-page disabled"
          data-type="prev"
          data-num="0"
          onClick={() => setPage(page > 1 ? page - 1 : 1)}
        >
          上一頁
        </span>{" "}
        {[...Array(pageCount).keys()].map((p) => (
          <span
            className={page === p + 1 ? "cur" : ""}
            onClick={() => setPage(p + 1)}
          >
            {p + 1}
          </span>
        ))}
        <span
          className="end-page"
          data-type="next"
          data-num="2"
          onClick={() => setPage(page < pageCount ? page + 1 : page)}
        >
          下一頁
        </span>{" "}
        <span
          className="end-page"
          data-type="last"
          data-num="11"
          onClick={() => setPage(pageCount)}
        >
          尾頁
        </span>
        <div className="inputBox">
          <input
            type="number"
            min={1}
            max={pageCount}
            maxLength="4"
            value={gotoPage}
            onChange={(e) => {
              const g = e.target.value;
              console.log("g", g);
              console.log("pageCount", pageCount);
              setGotoPage(g);
              // if (Number.isInteger(g) && g <= pageCount) {
              //   setGotoPage(g);
              // } else {
              //   setGotoPage(g);
              // }
            }}
          />
        </div>
        <div className="pageJumpTxt">頁</div>
        <span
          className="go"
          data-length="45"
          onClick={() => {
            if (gotoPage > pageCount) {
              setGotoPage(null);
            } else {
              setPage(gotoPage);
            }
          }}
        >
          GO
        </span>
      </div>
    );
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <section className="sec4 list">
      <div className="inner">
        <div className="menu">
          <div className="sort">
            {" "}
            <a
              href="javascript:;"
              title="TIME"
              className={sortBy === "time" ? "on" : null}
              data-sort="op_time"
              onClick={() => setSortBy("time")}
            >
              依順序
            </a>{" "}
            /{" "}
            <a
              href="javascript:;"
              className={sortBy === "vote" ? "on" : null}
              title="HOT"
              data-sort="thumb_cnt"
              onClick={() => setSortBy("vote")}
            >
              依人氣
            </a>{" "}
          </div>
          <div className="search">
            <input
              type="text"
              name="keyword"
              id="keyword"
              value={keyword}
              placeholder="關鍵字搜尋"
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          <select
            onChange={(e) => {
              setPage(1);
              setCategory(e.target.value);
            }}
          >
            <option value="">全部組別</option>
            <option value="PG">專業組</option>
            <option value="CG">創意組</option>
          </select>
          <div className="btn1">
            {!userInfo ? (
              <a href={getFbLoginUrl()}>登入</a>
            ) : (
              <>
                <span>{userInfo.name} </span>
                <a href="javascript:;" title="登出" onClick={logout}>
                  登出
                </a>
              </>
            )}
          </div>
        </div>

        <div className="con">
          <ul>
            {workList
              .slice((page - 1) * pageSize, pageSize * page)
              .map((item) => (
                <li key={`item-${item._id}`}>
                  {" "}
                  <Link to={`/cosplay/showcase/${item._id}`} className="tiao">
                    <div className="img">
                      {" "}
                      <img src={item.cover_img} alt={item.nickname} />{" "}
                    </div>
                    <p className="title">{item.work_subject}</p>
                    <p className="nick">{item.nickname}</p>
                  </Link>
                  <div className="btn">
                    {" "}
                    <a
                      href="javascript:;"
                      onClick={() => vote(item._id)}
                      title="vote"
                      data-id="1"
                    >
                      投票
                    </a>{" "}
                    <a
                      href="javascript:;"
                      title="facebook"
                      className="share_fb"
                      onClick={() => shareIt(item._id)}
                    >
                      分享
                    </a>
                    <div className="author_info">
                      {" "}
                      <span className="vote" data-id="1">
                        {item.voteCount}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
        <Pagination
          pageCount={
            Math.floor(workList.length / pageSize) +
            (workList.length % pageSize === 0 ? 0 : 1)
          }
        />
      </div>
    </section>
  );
};

export default ShowList;
