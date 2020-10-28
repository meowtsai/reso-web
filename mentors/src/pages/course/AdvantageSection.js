import React from "react";

const AdvantageSection = ({ game_name, pros = [] }) => {
  return (
    <section className="page-section" id="advantage">
      <div className="container">
        <div className="text-center">
          <h2 className="section-heading text-uppercase">教學優勢</h2>
          <h3 className="section-subheading text-muted">
            由導師們親自教授《{game_name}》
          </h3>
        </div>
        <div className="row text-center">
          {pros.map((p, index) => (
            <div
              key={`pro_${index}`}
              className={`col-md-${pros.length === 2 ? 6 : 4}`}
            >
              {" "}
              <span className="fa-stack fa-4x">
                {" "}
                <i className="fas fa-circle fa-stack-2x text-primary"></i>{" "}
                <i
                  className={`fas ${
                    index === 1
                      ? "fa-crosshairs"
                      : index === 2
                      ? "fa-lightbulb"
                      : "fa-chart-bar"
                  } fa-stack-1x fa-inverse`}
                ></i>{" "}
              </span>
              <h4 className="my-3">{p.title}</h4>
              <p className="text-muted">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvantageSection;
