import React from "react";
import { Link } from "react-router-dom";
const ApplySection = () => {
  return (
    <section className="sec1">
      <div className="apply_index">
        <div className="apply_nav">
          <div className="hover_area hover_area_p">
            <div className="apply_nav_item">
              <Link
                to="/cosplay/signup-pg"
                className="go_apply_btn1 apply_icons"
              >
                {" "}
              </Link>
            </div>
          </div>
          <div className="hover_area hover_area_t">
            <div className="apply_nav_item apply_nav_item_t">
              <Link
                to="/cosplay/signup-cg"
                className="go_apply_btn2 apply_icons"
              >
                {" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplySection;
