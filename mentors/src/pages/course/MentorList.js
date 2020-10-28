import React from "react";

const MentorList = ({ mentors }) => {
  return (
    <section className="page-section" id="teachers">
      <div className="container">
        <div className="text-center">
          <h2 className="section-heading text-uppercase">關於師資</h2>
          <h3 className="section-subheading text-muted">
            來認識厲害的講師陣容吧!
          </h3>
        </div>
        <div className="row">
          {mentors.map((mentor, index) => (
            <div
              key={mentor._id}
              className={mentors.length === 1 ? `col-lg-12` : "col-md-4"}
            >
              <div className="team-member">
                {" "}
                <img
                  className="mx-auto rounded-circle"
                  src={mentor.img}
                  alt=""
                />
                <h4>{mentor.name}</h4>
                <p className="text-muted">{mentor.intro}</p>
                {mentor.socials["youtube"] && (
                  <a
                    className="btn btn-dark btn-social mx-2"
                    href={mentor.socials["youtube"]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-youtube-square" title="Youtube"></i>
                  </a>
                )}
                {mentor.socials["facebook"] && (
                  <a
                    className="btn btn-dark btn-social mx-2"
                    href={mentor.socials["facebook"]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-facebook-f" title="Facebook"></i>
                  </a>
                )}
                {mentor.socials["instagram"] && (
                  <a
                    className="btn btn-dark btn-social mx-2"
                    href={mentor.socials["instagram"]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-instagram" title="Instagram"></i>
                  </a>
                )}
                {mentor.socials["twitch"] && (
                  <a
                    className="btn btn-dark btn-social mx-2"
                    href={mentor.socials["twitch"]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-twitch" title="Twitch"></i>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MentorList;
