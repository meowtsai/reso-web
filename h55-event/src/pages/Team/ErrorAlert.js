import React from "react";

const ErrorAlert = ({ error, clearError }) => {
  const itemKey0 = Object.keys(error)[0];
  //console.log(itemKey0);
  return (
    <div className="wrap" id="notic_wrap">
      <div className="wrap-con">
        <p>温馨提示：</p>
        <i onClick={clearError}></i>
        <div className="meg">
          <p> {error[itemKey0].message}</p>
          <button onClick={clearError}>確認</button>
        </div>
      </div>
    </div>
  );
};

export default ErrorAlert;
