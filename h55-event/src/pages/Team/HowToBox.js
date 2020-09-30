import React from "react";

const HowToBox = ({ optionId, clearHint }) => {
  console.log("HowToLineID", optionId);
  //options : wrap_game_id, wrap_game_name,wrap_line_id
  return (
    <div className="wrap" id={optionId}>
      <div className="wrap-con">
        <p></p>
        <i onClick={clearHint}></i>
        <div className="meg">
          {optionId === "wrap_line_id" ? (
            <img src="image/img-line-id.jpg" alt="" />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default HowToBox;

// //game id
//   <div className="wrap" style="display: none" id="wrap_game_id">
//     <div className="wrap-con">
//       <p></p>
//       <i onclick="$('.wrap').hide()"></i>
//       <div className="meg"></div>
//     </div>
//   </div>

//   //game name
//   <div className="wrap" style="display: none" id="wrap_game_name">
//     <div className="wrap-con">
//       <p></p>
//       <i onclick="$('.wrap').hide()"></i>
//       <div className="meg"></div>
//     </div>
//   </div>

//   //line id
//   <div className="wrap" style="display: none" id="wrap_line_id">
//     <div className="wrap-con">
//       <p></p>
//       <i onclick="$('.wrap').hide()"></i>
//       <div className="meg"> <img src="image/img-line-id.jpg" alt=""> </div>
//     </div>
//   </div>
