import React, { useEffect, useState } from "react";
import axios from "axios";
import AwardItem from "./AwardItem";
const AwardContent = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [tab, setTab] = useState("tab01");
  useEffect(() => {
    const getList = async () => {
      setLoading(true);

      axios
        .get(`/api/cosplay/list/award`)
        .then((res) => {
          setLoading(false);
          if (res.data) {
            setList(res.data);
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

  return (
    <section className="sec5">
      <div id="tab-demo">
        <ul className="tab-title">
          <li
            onClick={() => setTab("tab01")}
            className={tab === "tab01" ? "active" : ""}
            style={{ cursor: "pointer" }}
          >
            <a className={tab === "tab01" ? "on" : ""}>專業組得獎名單</a>
          </li>
          <li
            onClick={() => setTab("tab02")}
            className={tab === "tab02" ? "active" : ""}
            style={{ cursor: "pointer" }}
          >
            <a className={tab === "tab02" ? "on" : ""}>創意組得獎名單</a>
          </li>
        </ul>
        {list.length > 0 && tab === "tab01" && (
          <div id="tab01" className="tab-inner">
            " "
            <AwardItem
              contestant={
                list.filter(
                  (coser) => coser._id === "5fbc07c571105b1b94008fb3"
                )[0]
              }
              judge1={
                "夜鶯精靈的造型製作確實稱得令人讚嘆。不但對於角色設定進行了很好的還原，並且在實體化過程中非常合理注重對於材質的選取和人物狀態也十分到位。"
              }
              judge2={
                "服裝布料搭配非常符合角色的味道，服裝的版型製作的非常好，最讓我驚豔的是金色的羽毛，一開始我也以為他是用羽毛去製作的，結果放大看發現他是用布料去切割成羽毛的形狀，效果超乎預期的棒"
              }
              award={1}
            />
            <AwardItem
              contestant={
                list.filter(
                  (coser) => coser._id === "5fc76ddc75b38c03eec63809"
                )[0]
              }
              judge1={
                "照片整體構圖的氛圍完整，背景與道具椅起到了點睛作用，從整體來看，Coser對角色人設的把握很到位，鏡頭感與妝造也讓人驚豔。"
              }
              judge2={
                "妝容很棒，整體的服裝道具也很精緻，拍攝風格以及到布景搭配等等都非常棒"
              }
              award={2}
            />
            <AwardItem
              contestant={
                list.filter(
                  (coser) => coser._id === "5fc7a8da75b38c03eec6380b"
                )[0]
              }
              award={3}
              judge1={
                "幾位coser 對角色的情感以及氣質詮釋都很到位，動作也是極盡參考劇情後而融入了自己的一些見解，在場地、服裝、道具這方面，也是非常用心的達到了高水平。"
              }
              judge2={
                "場景以及coser的表現手法讓畫面具有張力，唯一一組讓我有體驗到玩遊戲那種緊張感的作品．內容故事性引人入勝，看的出來在腳本分鏡非常用心．"
              }
            />
            <AwardItem
              contestant={
                list.filter(
                  (coser) => coser._id === "5fc77d9b75b38c03eec6380a"
                )[0]
              }
              award={4}
            />
          </div>
        )}
        {list.length > 0 && tab === "tab02" && (
          <div id="tab02" className="tab-inner">
            <AwardItem
              contestant={
                list.filter(
                  (coser) => coser._id === "5fce4efedcb8bf42a99a0ab3"
                )[0]
              }
              award={1}
            />

            <AwardItem
              contestant={
                list.filter(
                  (coser) => coser._id === "5fad12a48101ac31e42808b7"
                )[0]
              }
              award={2}
            />

            <AwardItem
              contestant={
                list.filter(
                  (coser) => coser._id === "5fb09e6262e6b35eabe45556"
                )[0]
              }
              award={3}
            />

            <AwardItem
              contestant={
                list.filter(
                  (coser) => coser._id === "5fce4efedcb8bf42a99a0ab3"
                )[0]
              }
              award={4}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default AwardContent;
