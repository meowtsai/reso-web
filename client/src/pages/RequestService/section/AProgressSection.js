import React from "react";

const AProgressSection = ({ step }) => {
  const progressStep = [
    { id: "account", text: "合作對象", step: 1 },
    { id: "personal", text: "品牌資訊", step: 2 },
    { id: "payment", text: "合作方式", step: 3 },
    { id: "contact", text: "聯繫方式", step: 4 },
    { id: "confirm", text: "確認發送", step: 5 },
  ];
  return (
    <div
      id="progressbar-sticky-wrapper"
      className="sticky-wrapper"
      style={{ height: "117.833px" }}
    >
      <ul id="progressbar" className="sticky">
        {progressStep.map((ps) => {
          if (ps.step === step) {
            return (
              <li key={`pstep-${ps.id}`} className="active" id={ps.id}>
                {ps.text}
              </li>
            );
          } else {
            return (
              <li key={`pstep-${ps.id}`} id={ps.id}>
                {ps.text}
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default AProgressSection;
