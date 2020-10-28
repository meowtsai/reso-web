import React, { useEffect, useState } from "react";
import GameItem from "./GameItem";
import axios from "axios";
//import list from "../../courses_list";
const GameListSection = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const getGameList = async (id) => {
      axios
        .get(`/api/mentor/game_list`)
        .then((res) => {
          if (res.data.games) {
            setList(res.data.games);
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
    getGameList();
    return () => {};
  }, []);
  return (
    <section className="page-section bg-light" id="course">
      <div className="container">
        <div className="text-center">
          <h2 className="section-heading text-uppercase">遊戲報名</h2>
          <h3 className="section-subheading text-muted">
            請選擇您要預約的遊戲
          </h3>
        </div>
        <div className="row">
          {list.map((g) => (
            <GameItem key={g._id} game={g} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GameListSection;
