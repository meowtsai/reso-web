import React from "react";

const CheckboxSubSection = ({
  secid,
  title = "類型",
  note = "(可複選)",
  error,
  list,
  register,
}) => {
  return (
    <div id={`campaign-${secid}`} className="form-group row ml-0 mr-0">
      <label className="col-form-label col-12">
        <i className="far fa fa-pencil"></i>
        {title} &nbsp;
        <span className="note">{note}</span>
        {error && <small className="text-danger">* {error.message}</small>}
      </label>
      <div className="col-12 pl-0 pr-0">
        <div className="btn-group-toggle" data-toggle="buttons">
          {Object.keys(list).map((key) => (
            <label key={`cate_${key}`} className="btn btn-secondary">
              <input
                type="checkbox"
                autoComplete="off"
                value={key}
                name={secid}
                ref={register}
              />
              {list[key].cht}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CheckboxSubSection;
