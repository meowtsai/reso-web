import React from "react";

const DetailSection = ({ detail = { target: [], steps: {}, notes: [] } }) => {
  //console.log("DetailSection", detail);
  if (DetailSection === undefined) {
    return null;
  }
  return (
    <section className="page-section bg-light" id="description">
      <div className="container">
        <div className="text-center">
          <h2 className="section-heading text-uppercase">相關說明</h2>
          <h3 className="section-subheading text-muted">
            報名前請詳細閱讀相關說明
          </h3>
        </div>
        <div className="row">
          <div className="media-container" style={{ padding: "0 25px" }}>
            <div>
              <h2 className="item-title">適合對象</h2>
              <div className="item-desc" style={{ whiteSpace: "pre-wrap" }}>
                <p>{detail.target.map((t) => `${t}\n`)}</p>
              </div>
              <h2 className="item-title">步驟說明</h2>
              <div className="item-desc" style={{ whiteSpace: "pre-wrap" }}>
                <p>
                  {Object.keys(detail.steps).map(
                    (step) => `✦步驟${step} ‒ ${detail.steps[step]}\n`
                  )}
                </p>
              </div>
              <h2 className="item-title">注意事項</h2>
              <div className="item-desc" style={{ whiteSpace: "pre-wrap" }}>
                <p>{detail.notes.map((t) => `${t}\n`)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailSection;
