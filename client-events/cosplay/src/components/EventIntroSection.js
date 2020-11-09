import React from "react";

const EventIntroSection = () => {
  return (
    <section className="sec1-1">
      <p className="sec-title"></p>
      <div className="sec-box">
        <p className="sec1-title" style={{ fontSize: "18px" }}>
          在《第五人格》的神秘莊園中，每個人物都擁有自己獨特的背景故事和特色。在一場場追逐與逃生的競賽裡，陪伴你逃出生天、奪取勝利。
          現在，邀請各位偵探們一起發揮創意與想像力，化身你最愛的角色，重新演繹、賦予角色們新生命。在這個舞臺上盡情地展現對角色的熱愛與創造力吧！
        </p>
        <p className="match">⇝競賽主題⇜</p>
        <p className="sec1-title">
          本次賽事，投稿作品需符合「華麗追逐
          玩美求生」的活動主題。並以《第五人格》手遊中的角色與劇情內容作為創作來源，自由延伸表達主題，不限作品創作風格及表現方式。
          <span className="b">※不含IP聯動作品角色</span>
        </p>
        <p className="match">⇝活動時程⇜</p>
        <p className="sec1-title">
          報名徵集：2020/11/12~12/9 23:59
          <br />
          網路投票：2020/12/11~12/15 23:59
          <br />
          得獎公告：2020/12/16
          <br />
          頒獎儀式：2020/12/20
          <br />
          <span className="b">
            ※頒獎儀式當天，得獎者需至現場接受表揚，屆時還請得獎者提前空出時間。
          </span>
        </p>
        <p className="match">⇝競賽分組⇜</p>
        <p className="sec1-title">
          本次賽事分為「專業組」及「創意組(低成本Cosplay)」 進行徵稿，
          <span className="b">兩組別不得同時投稿</span>，還請參賽者注意。
          <br />
          <span className="b">【專業組】</span>
          <br />
          1.不限任何Cosplay技法，需完整呈現遊戲中的角色人物設定，並透過個人創意設計合適的場景、道具及構圖。
          <br />
          2.不限制單人或團體形式創作作品。若為多人、團隊拍攝作品只需代表人投稿參賽即可。
          <br />
          <span className="b">【創意組】</span>
          <br />
          1.
          為鼓勵喜愛《第五人格》的玩家們參與本次活動，特別開放「創意組」Cosplay徵集。
          <br />
          2. 以創意、低成本、DIY手工製作為主要呈現方式進行角色Cosplay。
          <br />
          3. 創意組僅限個人投稿參賽，不得以團體形式參加。
          <br />
          4. 投稿作品時，上傳圖檔中必須至少含有一張原始角色與Cosplay對比圖。{" "}
        </p>
      </div>
      <div className="sec1-img-c">
        <img src="image/c.png" width="300px" alt="" />
      </div>
      <div className="sec1-img-d">
        <img src="image/d.png" width="200px" alt="" />
      </div>
    </section>
  );
};

export default EventIntroSection;
