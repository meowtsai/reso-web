import React from "react";

const Header = () => {
  return (
    <header>
      <nav className="nav">
        <ul>
          <li className="open">
            {" "}
            <a href="index.html">
              <p>11/12-12/9</p>
              <p>報名徵集階段</p>
            </a>{" "}
          </li>
          <li>
            {" "}
            <a
              href="javascript:alert('敬請期待，預計2020/11/11開放投票喔')"
              id="#tab2"
            >
              <p>12/11-12/15</p>
              <p>線上投票階段</p>
            </a>{" "}
          </li>
          <li>
            {" "}
            <a
              href="javascript:alert('敬請期待，預計2020/11/16公布得獎者喔')"
              id="#tab3"
            >
              <p>2020/12/16</p>
              <p>得獎公告</p>
            </a>{" "}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
