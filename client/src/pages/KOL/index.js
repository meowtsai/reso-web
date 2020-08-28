import React, { Fragment } from "react";
import KOLRow from "./KOLRow";
const KOLIndex = () => {
  const ytdata = [
    { title: "這群人TGOP", image: "img/kol-Y/TGOP.jpg" },
    { title: "眾量級CROWD", image: "img/kol-Y/CROWD.jpg" },
    { title: "葉式特工Yes Ranger", image: "img/kol-Y/YesRanger.jpg" },
    {
      title: "黃氏兄弟P",
      image: "img/kol-Y/HuangBros.jpg",
    },
    { title: "howfun", image: "img/kol-Y/howfun.jpg" },
    { title: "啾啾鞋", image: "img/kol-Y/chuchushoe.jpg" },
    { title: "人生肥宅X尊", image: "img/kol-Y/loserZUN.jpg" },
    { title: "Onion Man", image: "img/kol-Y/OnionMan.jpg" },
    { title: "谷阿莫", image: "img/kol-Y/AmoGood.jpg" },
    { title: "木曜4超玩", image: "img/kol-Y/muyao4.jpg" },
    { title: "OWACKYBOYS反骨男孩", image: "img/kol-Y/WACKYBOYS.jpg" },
    { title: "展榮展瑞 K.R Bros", image: "img/kol-Y/KeelongRays.jpg" },
    { title: "吃貨們", image: "img/kol-Y/EatFunnyGirl.jpg" },
    { title: "HahaTai哈哈台", image: "img/kol-Y/HahaTai.jpg" },
  ];

  const coserdata = [
    { title: "狂間King", image: "img/kol-C/kingxmon.jpg" },
    { title: "Chihiro千尋", image: "img/kol-C/loveno1chihiro.jpg" },
    { title: "周荀DenKa", image: "img/kol-C/DenKa.jpg" },
    { title: "Mon夢", image: "img/kol-C/Mon.jpg" },
    { title: "喵少", image: "img/kol-C/CosAliceCat.jpg" },
    { title: "Nori何苔苔", image: "img/kol-C/Nori.jpg" },
    { title: "Yao & Alma", image: "img/kol-C/Yao&Alma.jpg" },
    { title: "沖田凜花Rinka", image: "img/kol-C/Rinka.jpg" },
  ];

  const streamerdata = [
    { title: "GodJJ", image: "img/kol-S/GodJJ.jpg" },
    { title: "老皮", image: "img/kol-S/tolocat.jpg" },
    { title: "懶貓 LanCat", image: "img/kol-S/LanCat.jpg" },
    { title: "K7凱琪", image: "img/kol-S/K7.jpg" },
    { title: "RHung阿航", image: "img/kol-S/RHung.jpg" },
    { title: "我不喝拿鐵", image: "img/kol-S/idontdrinklatte.jpg" },
    { title: "Cqi西區", image: "img/kol-S/Cqi.jpg" },
    { title: "鶻先生", image: "img/kol-S/zhihaoq1.jpg" },
    { title: "菜喳", image: "img/kol-S/zynxyz.jpg" },
    { title: "巧克力", image: "img/kol-S/chocolate.jpg" },
    { title: "bubuchacha", image: "img/kol-S/bubuchacha.jpg" },
    { title: "三度", image: "img/kol-S/threedegree.jpg" },
    { title: "Dinter", image: "img/kol-S/Dinter.jpg" },
    { title: "大丸 Winds", image: "img/kol-S/Winds.jpg" },
    { title: "解婕翎", image: "img/kol-S/dollshin.jpg" },
    { title: "瑀熙Yuci", image: "img/kol-S/Yuci.jpg" },
    { title: "Mita", image: "img/kol-S/Mita.jpg" },
    { title: "貝莉莓", image: "img/kol-S/berylulu.jpg" },
    { title: "Tozy", image: "img/kol-S/Tozy.jpg" },
    { title: "Stanley", image: "img/kol-S/Stanley.jpg" },
    { title: "小葵XiaoKui", image: "img/kol-S/XiaoKui.jpg" },
    { title: "Lice萊斯", image: "img/kol-S/lice.jpg" },
    { title: "平民百姓", image: "img/kol-S/layman.jpg" },
    { title: "我是RT", image: "img/kol-S/imRT.jpg" },
    { title: "黑科技GaMan", image: "img/kol-S/GaMan.jpg" },
    { title: "歐拉", image: "img/kol-S/ola.jpg" },
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
