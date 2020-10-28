import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import RegisterForm from "./RegisterForm";
import ResultModal from "./ResultModal";
import ErrorModal from "./ErrorModal";
import Spinner from "../../components/Spinner";
import axios from "axios";
import "./form.css";
//import list from "../../courses_list";
const FormScreen = ({ match }) => {
  const game_id = match.params.game_id;
  const course_id = match.params.course_id;
  const [game, setGame] = useState({});
  const [registerResult, setRegisterResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  //console.log(game);
  useEffect(() => {
    document.title = "線上訓練班課程報名";
    const getGameById = async (game_id) => {
      setLoading(true);
      //console.log(`/api/mentor/game/${game_id}`);
      axios
        .get(`/api/mentor/game/${game_id}`)
        .then((res) => {
          setLoading(false);
          if (res.data.game) {
            setGame({ ...res.data.game, mentors: res.data.mentors });
          }
        })
        .catch((err) => {
          setLoading(false);
          //console.log(err.message);
          setError(err.message);
        });
    };
    getGameById(game_id);
    return () => {};
  }, [game_id]);

  if (!game.gameId || loading) {
    return <Spinner />;
  }

  return (
    <>
      <NavBar type={"form"} />
      <Header type={"form"} />

      <section className="page-section bg-light" id="course">
        <div className="container">
          <div className="text-center">
            <h2 className="section-heading text-uppercase">{game.name}</h2>
            <h2 className="section-subheading text-muted">課程報名</h2>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <RegisterForm
                setRegisterResult={(result) => setRegisterResult(result)}
                setError={(error) => setError(error)}
                game={game || []}
                course_id={course_id}
              />
            </div>
          </div>
        </div>
      </section>
      {registerResult?._id && (
        <ResultModal
          registerResult={registerResult}
          onClose={() => setRegisterResult(null)}
        />
      )}
      {error && <ErrorModal error={error} onClose={() => setError(null)} />}
    </>
  );
};

export default FormScreen;
