import React from "react";

const NotesSection = () => {
  return (
    <>
      <a id="rule" name="rule" href="!#">
        {" "}
      </a>

      <section className="sec3">
        <p className="sec-title"></p>
        <div className="rule-box">
          <div className="rule-con">
            <p className="match-rule">參加方式</p>
            <p className="rule-title">
              1.
              於活動報名期間，至本大賽網頁點選「我要報名」填寫相關資料並上傳作品。
              <br />
              2. 作品規格
              <br />
              <span className="text">
                ❖專業組：每位參賽者可上傳至多10張照片，需以副檔名*.jpg,*.jpeg,*.png格式上傳，每張照片檔案大小需小於4MB。
              </span>
              <br />
              <span className="text">
                ❖創意組：每位參賽者可上傳至多5張照片，需以副檔名*.jpg,*.jpeg,*.png格式上傳，每張照片檔案大小需小於2MB。
                <br />
                上傳圖檔中需至少含有一張原始角色與Cosplay對比圖。
              </span>
              <br />
              3.
              請參賽者詳閱賽事規則，一旦送出資料完成報名即表示同意本賽事所有相關規範。{" "}
            </p>
            <p className="match-rule">活動獎勵</p>
            <div className="rule-title">
              <table>
                <tbody>
                  <tr className="a">
                    <td>組別</td>
                    <td>名次</td>
                    <td>周邊獎勵</td>
                    <td>其他獎勵</td>
                  </tr>
                  <tr>
                    <td rowSpan="11">專業組</td>
                    <td rowSpan="4">金賞</td>
                    <td>第五人格Q版靜態人偶-傑克</td>
                    <td rowSpan="4">
                      獎金NT10,000元整
                      <br />
                      精選作品無框畫
                    </td>
                  </tr>
                  <tr>
                    <td>第五人格換裝公仔</td>
                  </tr>
                  <tr>
                    <td>第五人格隨從掛件</td>
                  </tr>
                  <tr>
                    <td>第五人格鑰匙扣系列-學生卡</td>
                  </tr>
                  <tr>
                    <td rowSpan="3">銀賞</td>
                    <td>第五人格Q版靜態人偶-傑克</td>
                    <td rowSpan="7">精選作品無框畫</td>
                  </tr>
                  <tr>
                    <td>第五人格換裝公仔</td>
                  </tr>
                  <tr>
                    <td>第五人格隨從掛件</td>
                  </tr>
                  <tr>
                    <td rowSpan="2">銅賞</td>
                    <td>第五人格Q版靜態人偶-傑克</td>
                  </tr>
                  <tr>
                    <td>第五人格換裝公仔</td>
                  </tr>
                  <tr>
                    <td rowSpan="2">人氣賞</td>
                    <td>第五人格隨從掛件</td>
                  </tr>
                  <tr>
                    <td>第五人格鑰匙扣系列-學生卡</td>
                  </tr>
                  <tr>
                    <td rowSpan="9">創意組</td>
                    <td rowSpan="3">金賞</td>
                    <td>第五人格換裝公仔</td>
                    <td rowSpan="9">無</td>
                  </tr>
                  <tr>
                    <td>第五人格包包系列-隨從零錢包</td>
                  </tr>
                  <tr>
                    <td>第五人格鑰匙扣系列-學生卡</td>
                  </tr>
                  <tr>
                    <td rowSpan="2">銀賞</td>
                    <td>第五人格換裝公仔</td>
                  </tr>
                  <tr>
                    <td>第五人格包包系列-隨從零錢包</td>
                  </tr>
                  <tr>
                    <td rowSpan="2">銅賞</td>
                    <td>第五人格換裝公仔</td>
                  </tr>
                  <tr>
                    <td>第五人格包包系列-隨從零錢包</td>
                  </tr>
                  <tr>
                    <td rowSpan="2">人氣賞</td>
                    <td>第五人格換裝公仔</td>
                  </tr>
                  <tr>
                    <td>第五人格鑰匙扣系列-學生卡</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="match-rule">評選方式</p>
            <p className="rule-title">
              人氣賞：依據作品於投票階段獲得的投票總數評定，以獲得投票數最高之作品獲獎。
            </p>
            <table>
              <tbody>
                <tr className="a">
                  <td>評分項目</td>
                  <td>說明</td>
                  <td>占比</td>
                </tr>
                <tr>
                  <td>角色表現</td>
                  <td>角色完整度、細節呈現方式</td>
                  <td>40%</td>
                </tr>
                <tr>
                  <td>主題創意</td>
                  <td>創作主題、表現手法、具新意與創造性</td>
                  <td>35%</td>
                </tr>
                <tr>
                  <td>畫面呈現</td>
                  <td>拍攝、構圖手法、後制效果氛圍</td>
                  <td>20%</td>
                </tr>
                <tr>
                  <td>網路投票</td>
                  <td>網路投票票數</td>
                  <td>5%</td>
                </tr>
              </tbody>
            </table>
            <p className="match-rule">投票辦法</p>
            <p className="rule-title">
              1.點擊作品上的「投票」按鈕，並登入個人Facebook帳號、完成驗證後即可完成投票。
              <br />
              2.每個Facebook帳號每天最多可投一票。
              <br />
              3.歡迎使用作品分享功能，將喜愛的作品分享至社群平臺為支持的Coser增加人氣。
            </p>
            <p className="match-rule" id="note">
              參賽注意事項
            </p>
            <p className="rule-title">
              一、參賽需知
              <br />
              1. 本賽事活動限臺灣地區參賽者報名。
              <br />
              2.
              每位參賽者僅能投稿一次，且不得同時報名兩個分組，若重複投稿則視為資格不符。
              <br />
              3.
              報名資訊送出前請確認填寫正確，一旦送出則不得進行更改，還請參賽者注意。
              <br />
              4. 參賽資料如有造假、不符事實者將取消參賽資格及獲得獎勵。
              <br />
              5.
              本活動單位保留刊登參賽者名單及其提交之照片作宣傳用途之權利，而無須事前徵求參賽者同意或給予任何形式之報酬。
              <br />
              6. 參賽作品不得宣揚暴力、色情或其他不良及敏感內容。
              <br />
              7. 報名作品經過主辦單位初步審查通過，才可進入網路投票環節。
              <br />
              8.
              參賽作品不得添加無關訊息或浮水印(例如團體名稱、贊助廠商、粉絲團資訊等)。
              <br />
              <br />
              二、作品版權
              <br />
              1.
              參賽作品必須為原創作品，不得抄襲、盜用他人作品或冒用他人名義進行投稿。若經查屬實則取消參賽資格。
              <br />
              2.
              參賽作品必須擁有獨立的版權、著作權和肖像權；若其版權歸屬多人的情況下，參賽者需確保已獲得其他版權所有人的完整授權。如參賽作品涉及侵權之情事，則由參賽者自行負責，與活動主辦單位無涉。
              <br />
              3.
              參賽作品版權歸Coser個人、團隊與主辦單位共同所有，賽事投稿之作品視為允許本單位於活動相關之官方網站、粉絲團、媒體報導等平臺署名展出。
              <br />
              <br />
              三、個人資料使用事項
              <br />
              1.
              參加者同意主辦單位，依照個人資料保護法之規定，基於本活動之執行、廣告、行銷目的，搜集、處理並利用參加者所提供之個人資料，截至參加者主動請求主辦單位刪除、停止處理或利用其個人資料為止。
              <br />
              2.
              參加者所提供的個人資料，將用於提供主辦單位寄送通知、確認身份等與本活動有關之事宜使用。參加者有權得隨時請求主辦單位查閱、給予複本、或補正本人的個人資料，亦得隨時洽主辦單位表示拒絕主辦單位繼續搜集、處理、利用或刪除本人的個人資料；惟主辦單位因執行本活動所必要者，則不在此限。
              <br />
              3.
              若參加者不提供或提供錯誤之個人資料，主辦單位將取消參加者之參加或得獎資格。
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotesSection;
