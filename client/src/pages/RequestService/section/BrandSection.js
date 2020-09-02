import React from "react";
import { useFormContext } from "react-hook-form";
const BrandSection = ({ step, setStep }) => {
  const { register, errors, trigger } = useFormContext();
  const nextStep = async () => {
    const result = await trigger([
      "brandname",
      "productname",
      "producturl1",
      "producturl2",
      "producturl3",
    ]);
    //console.log("result", result);
    if (result) {
      setStep(1);
    }
  };
  return (
    <fieldset className={step === 2 ? "step-current" : "step-non-current"}>
      <div className="form-card">
        <h2>2.品牌資訊</h2>
        <div id="campaign-brandname" className="form-group row ml-0 mr-0">
          <label className="col-form-label col-12">
            <i className="far fa fa-pencil"></i> 品牌名稱{" "}
            {errors.brandname && (
              <small className="text-danger">
                * {errors.brandname.message}
              </small>
            )}
          </label>
          <div className="col-12 pl-0 pr-0">
            <input
              type="text"
              className="form-control required"
              placeholder="請輸入品牌名稱"
              name="brandname"
              ref={register({
                required: "請填寫要合作的品牌名稱",
              })}
            />
          </div>
          <label className="col-form-label col-12">
            <i className="far fa fa-pencil"></i> 商品名稱{" "}
            {errors.productname && (
              <small className="text-danger">
                * {errors.productname.message}
              </small>
            )}
          </label>
          <div className="col-12 pl-0 pr-0">
            <input
              type="text"
              className="form-control required"
              placeholder="請輸入商品名稱"
              name="productname"
              ref={register({
                required: "請輸入商品名稱",
              })}
            />
          </div>
        </div>
        <div id="campaign-productlinks" className="form-group row ml-0 mr-0">
          <label className="col-form-label col-12">
            <i className="far fa fa-pencil"></i> 想要合作的商品連結{" "}
            {errors.producturl1 && (
              <small className="text-danger">
                * {errors.producturl1.message}
              </small>
            )}
          </label>
          <div className="col-12 pl-0 pr-0">
            <input
              type="text"
              className="form-control required"
              placeholder="請輸入商品連結"
              name="producturl1"
              ref={register({
                required: "請輸入至少一個商品連結",
              })}
            />
          </div>
          <div className="col-12 pl-0 pr-0">
            <input
              type="text"
              className="form-control required"
              placeholder="請輸入商品連結"
              name="producturl2"
              ref={register}
            />
          </div>
          <div className="col-12 pl-0 pr-0">
            <input
              type="text"
              className="form-control required"
              placeholder="請輸入商品連結"
              name="producturl3"
              ref={register}
            />
          </div>
        </div>
      </div>
      <input
        type="button"
        name="previous"
        className="previous action-button-previous"
        value="上一步"
        onClick={() => setStep(-1)}
      />
      <input
        type="button"
        name="next"
        className="next action-button step-2"
        value="下一步"
        onClick={nextStep}
      />
    </fieldset>
  );
};

export default BrandSection;
