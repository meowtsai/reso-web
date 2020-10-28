import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import AdvantageSection from "./AdvantageSection";
import CourseList from "./CourseList";
import MentorList from "./MentorList";
import DetailSection from "./DetailSection";
import WireReportForm from "./WireReportForm";
import Spinner from "../../components/Spinner";

import axios from "axios";
import "./course.css";

const CourseScreen = ({ match }) => {
  const game_id = match.params.game_id;
  const [game, setGame] = useState({});
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(false);

  //console.log("game", game.detail);
  //console.log("mentors", mentors);
  useEffect(() => {
    const getGameById = async (game_id) => {
      setLoading(true);
      //console.log(`/api/mentor/game/${game_id}`);
      axios
        .get(`/api/mentor/game/${game_id}`)
        .then((res) => {
          setLoading(false);
          if (res.data.game) {
            setGame(res.data.game);
          }
          if (res.data.mentors) {
            setMentors(res.data.mentors);
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err.message);
          //setError(err.message);
        });
    };
    getGameById(game_id);
    return () => {};
  }, [game_id]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <NavBar type={"course"} />
      <Header type={"course"} info={game} game_id={game_id} />
      <AdvantageSection game_name={game.gameName} pros={game.pros} />
      <CourseList game_id={game_id} courses={game.courses || []} />
      <MentorList mentors={mentors} />
      <DetailSection detail={game.detail} />
      <WireReportForm gameId={game_id} gameName={game.gameName} />
    </>
  );
};

export default CourseScreen;
