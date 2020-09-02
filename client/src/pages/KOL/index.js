import React, { Fragment } from "react";
import KOLRow from "./KOLRow";
import "./kol.css";
const KOLIndex = () => {
  const ytdata = [
    { title: "這群人TGOP", image: "img/kol-Y/TGOP.jpg" },
    { title: "眾量級CROWD", image: "img/kol-Y/CROWD.jpg" },
    { title: "葉式特工Yes Ranger", image: "img/kol-Y/YesRanger.jpg" },
    { title: "人生肥宅X尊", image: "img/kol-Y/loserZUN.jpg" },
    { title: "木曜4超玩", image: "img/kol-Y/muyao4.jpg" },
    { title: "展榮展瑞 K.R Bros", image: "img/kol-Y/KeelongRays.jpg" },
    { title: "吃貨們", image: "img/kol-Y/EatFunnyGirl.jpg" },
    { title: "華森", image: "img/kol-Y/hanksmkinghw.jpg" },
    { title: "鐵牛", image: "img/kol-Y/ironbull.jpg" },
    { title: "放火", image: "img/kol-Y/louislee0602.jpg" },
  ];

  const coserdata = [
    { title: "狂間King", image: "img/kol-C/kingxmon.jpg" },
    { title: "Chihiro千尋", image: "img/kol-C/loveno1chihiro.jpg" },
    { title: "Nori何苔苔", image: "img/kol-C/Nori.jpg" },
    { title: "沖田凜花Rinka", image: "img/kol-C/Rinka.jpg" },
    { title: "HaneAme雨波", image: "img/kol-C/HaneAme.jpg" },
    { title: "甜食超人-毛毛(Momo)", image: "img/kol-C/Momo.jpg" },
    { title: "蕎蕎_小妃姬", image: "img/kol-C/kosos2684.jpg" },
    { title: "女魔術師王子妃＊Fay's BOOK", image: "img/kol-C/FaysBOOK.jpg" },
    { title: "佐歌奈Sakana", image: "img/kol-C/Sakana.jpg" },
    { title: "芥川Aku", image: "img/kol-C/Aku.jpg" },
    { title: "七七小姐_Miss Seven", image: "img/kol-C/MissSeven.jpg" },
    { title: "Hachi∞小芭", image: "img/kol-C/Hachi.jpg" },
    { title: "Ryu-琉", image: "img/kol-C/Ryu.jpg" },
    { title: "竜-garuda", image: "img/kol-C/garuda.jpg" },
  ];

  const streamerdata = [
    { title: "K7凱琪", image: "img/kol-S/K7.jpg" },
    { title: "RHung阿航", image: "img/kol-S/RHung.jpg" },
    { title: "我不喝拿鐵", image: "img/kol-S/idontdrinklatte.jpg" },
    { title: "Cqi西區", image: "img/kol-S/Cqi.jpg" },
    { title: "鶻先生", image: "img/kol-S/zhihaoq1.jpg" },
    { title: "Lice萊斯", image: "img/kol-S/lice.jpg" },
    { title: "平民百姓", image: "img/kol-S/layman.jpg" },
    { title: "我是RT", image: "img/kol-S/imRT.jpg" },
  ];
  return (
    <Fragment>
      <KOLRow title={"youtuber"} data={ytdata} />
      <KOLRow
        title={"streamer"}
        data={streamerdata}
        style={{ backgroundColor: "#fff" }}
      />
      <KOLRow title={"coser"} data={coserdata} />
    </Fragment>
  );
};

export default KOLIndex;
