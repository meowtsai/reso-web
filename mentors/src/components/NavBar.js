import React from "react";

const NavBar = ({ type }) => {
  let menu;
  switch (type) {
    case "course":
      menu = [
        { path: "/mentors", text: "回首頁" },
        { path: "#advantage", text: "教學優勢" },
        { path: "#course", text: "訓練報名" },
        { path: "#teachers", text: "關於師資" },
        { path: "#description", text: "相關說明" },
      ];
      break;
    case "form":
      menu = [{ path: "/mentors", text: "回首頁" }];
      break;
    default:
      menu = [{ path: "#course", text: "立即報名" }];
      break;
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
      <div className="container">
        <button
          className="navbar-toggler navbar-toggler-right"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          {" "}
          <i className="fas fa-bars ml-1"></i>{" "}
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav text-uppercase ml-auto">
            {menu.map((m, i) => (
              <li key={`menu_${i}`} className="nav-item">
                <a className="nav-link js-scroll-trigger" href={m.path}>
                  {m.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
