import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="footer-con">
        <div className="img-box">
          <div>
            {" "}
            <img src="/idvtwcampus/image/icon-footer-img1.png" alt="" />{" "}
          </div>
          <div>
            {" "}
            <img src="/idvtwcampus/image/icon-footer-img2.png" alt="" />{" "}
          </div>
          <div>
            {" "}
            <img src="/idvtwcampus/image/icon-footer-img3.png" alt=" " />
            <p className="text-white">
              {" "}
              台灣遊戲代理：龍邑股份有限公司
              <br />
              線上回報網址：
              <a
                className="text-orange"
                href="//support.longeplay.com.tw/service_quick?param_game_id=h55naxx2tw"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                https://game.longeplay.com.tw/service_quick
                /question?site=h55naxx2tw{" "}
              </a>{" "}
            </p>
          </div>
        </div>
        <div className="text-box">
          <p className="text-white1">
            {" "}
            《第五人格》依遊戲軟體分級管理辦法分類為輔15級，本應用遊戲情節涉及性、暴力、恐怖。
            <br />
            本應用遊戲為免費使用，内另有提供購買虛擬遊戲幣、物品等付費服務。請依個人興趣、能力進行體驗，請注意遊戲時間，避免沉迷。
            <br />
            Privacy Policy, Terms and Conditions © 1997-2020 NetEase, Inc All
            Rights Reserved{" "}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
