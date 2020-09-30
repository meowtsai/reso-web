import React from "react";

const Header = () => {
  return (
    <header>
      <p className="logo"></p>
      <ul>
        <li>
          {" "}
          <a href="/idvtwcampus/">
            <p>首頁</p>
            <p>INDEX</p>
          </a>{" "}
        </li>
        <li>
          {" "}
          <a href="/idvtwcampus/team" id="btn_signUp">
            <p>賽事報名</p>
            <p>SIGN UP</p>
          </a>{" "}
        </li>
        <li>
          {" "}
          <a href="#live">
            <p>觀看直播</p>
            <p>LIVE</p>
          </a>{" "}
        </li>
        <li>
          {" "}
          <a href="#schedule">
            <p>賽程簡介</p>
            <p>INFO</p>
          </a>{" "}
        </li>
        <li>
          {" "}
          <a href="#rule">
            <p>賽事規則</p>
            <p>RULE</p>
          </a>{" "}
        </li>
      </ul>
    </header>
  );
};

export default Header;
