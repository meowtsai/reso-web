import React from "react";

const Form = () => {
  return (
    <section className="sec4">
      <p className="sec-title"></p>
      <p className="sec-title2">(未滿五人) </p>
      <div className="userSign-box">
        <p className="userSign-title"></p>
        <div>
          <label for="">我們已經有</label>
          <div>
            <div className="form1-con1">
              <label for="">監管者</label>
              <input
                id="OwnHunter"
                value=""
                onchange="comm.CheckHunter(1,this)"
              />
              <label for="">位</label>
            </div>
            <div className="form1-con2">
              <label for="">求生者</label>
              <input
                id="OwnSurvivor"
                value=""
                onchange="comm.CheckSurvivor(1,this)"
              />
              <label for="">位</label>
            </div>
          </div>
        </div>
        <div>
          <label for="">我們需要</label>
          <div>
            <div className="form1-con1">
              <label for="">監管者</label>
              <input
                id="NeedHunter"
                readonly=""
                value=""
                onchange="comm.CheckHunter(2,this)"
              />
              <label for="">位</label>
            </div>
            <div className="form1-con2">
              <label for="">求生者</label>
              <input
                id="NeedSurvivor"
                readonly=""
                value=""
                onchange="comm.CheckSurvivor(2,this)"
              />
              <label for="">位</label>
            </div>
          </div>
        </div>
        <div>
          <label for="">聯絡人姓名</label>
          <div>
            <input
              type="text"
              placeholder="請填寫真實姓名"
              id="name"
              onchange="comm.CheckName(this)"
              autocomplete="off"
            />
          </div>
        </div>
        <div>
          <label for="">手機號碼</label>
          <div>
            <div className="regionCode" style={{ cursor: "pointer" }}>
              {" "}
              <span id="phone_code" onclick="ChooseCode(this)">
                +886
              </span>{" "}
              <i onclick="ChooseCode(this)"></i>
              <ul style={{ display: "none" }} className="phone-code">
                <li onclick="phoneCode(this)">+852</li>
                <li onclick="phoneCode(this)">+853</li>
                <li onclick="phoneCode(this)">+886</li>
              </ul>
            </div>
            <input
              type="text"
              placeholder="請填寫你的手機號碼"
              id="phone"
              onchange="comm.CheckPhone(this)"
            />
          </div>
        </div>
        <div>
          <label for="">LINE ID</label>
          <i onclick="showLineId()"> &lt;什麼是 LINE ID&gt; </i>
          <div>
            <input
              type="text"
              placeholder="請填寫你的LINE ID"
              id="line_id"
              onchange="comm.CheckLineID(this)"
            />
          </div>
        </div>
        <div>
          <label for="">出生日期</label>
          <i className="old"> &lt;選手須年滿 15 歲&gt; </i>
          <div>
            <input
              type="text"
              readonly=""
              placeholder="YYYY/MM/DD"
              id="birthday"
              lay-key="1"
            />
          </div>
        </div>
        <div>
          <label for="">電子信箱</label>
          <div>
            <input
              type="text"
              placeholder="E-Mail"
              id="email"
              onchange="comm.CheckMail(this)"
              autocomplete="off"
            />
          </div>
        </div>
        <div>
          <label for="">聯絡人 Game ID</label>
          <i onclick="showGameId()"> &lt;什麼是 Game ID&gt; </i>
          <div>
            <input
              type="text"
              placeholder="Game ID"
              id="game_id"
              onchange="comm.CheckGameID(this)"
            />
          </div>
        </div>
        <div>
          <label for="">聯絡人 Game Name</label>
          <i onclick="showGameName()"> &lt;什麼是 Game Name&gt; </i>
          <div>
            <input
              type="text"
              placeholder="遊戲角色名稱"
              id="game_name"
              onchange="comm.CheckGameName(this)"
            />
          </div>
        </div>
      </div>
      <button onclick="idv.FindTeam()"></button>
    </section>
  );
};

export default Form;
