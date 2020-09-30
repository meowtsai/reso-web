import React from "react";

const SectionNote = ({ page = "team" }) => {
  return (
    <section className={page === "match" ? "sec2" : "sec"}>
      <p className="sec-title"></p>
      <div className="attention-box">
        {page === "match" ? (
          <p>
            未滿五人的玩家可以在此點選目前已經有的選手人數，並且進行媒合報名。
            <br />
            媒合成功的玩家們，還是要<strong>重新到官網組隊報名</strong>喔！
            <br />
            <br />
            媒合報名為未滿五人的隊伍所使用，並非尋找替補的管道，請玩家們特別注意
          </p>
        ) : (
          <p>
            ※報名形式分為：隊長報名及媒合報名兩種。
            <br />
            ※每支隊伍由 5 名先發隊員和最多 2 名替補隊員組成。
            <br />
            1.隊長報名—由選手自行組隊完成，並由隊長統一提交報名資訊。
            <br />
            2.媒合報名—選手未能自行組隊完成，可個別提交報名資訊，由賽事官方與其他報名選手媒合轉介聯繫，讓選手組成完整隊伍。
            <br />
            ※參賽選手資格限居住於台港澳區之年滿15歲之合法居民參加，20歲以下參加者須徵得家長或監護人同意。
            <br />
            ※如經查核選手上傳之身分證件為造假，一律取消隊伍報名資格，請再三確認上傳之報名資訊無誤。
          </p>
        )}
      </div>
    </section>
  );
};

export default SectionNote;
