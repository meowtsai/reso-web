import React, { useState, useEffect, Fragment } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
const WireReportForm = ({ gameId, gameName }) => {
  const [loading, setLoading] = useState(false);
  const [submitResult, setSubmitResult] = useState(false);
  const [serverError, setServerError] = useState("");
  const { register, handleSubmit, errors } = useForm(); // initialise the hook

  useEffect(() => {
    return () => {
      setSubmitResult(false);
    };
  }, []);

  const onSubmit = (reportData) => {
    //console.log(reportData);
    reportData.gameId = gameId;
    setLoading(true);
    axios
      .post("/api/mentor/wirereport", reportData)
      .then((res) => {
        setLoading(false);

        setSubmitResult(true);
      })
      .catch((err) => {
        setLoading(false);
        //console.log(err.response.data);
        setServerError(err.response.data?.msg);
        setSubmitResult(true);
      });

    //成功
  };

  //   if (loading) {
  //     return <i className="fas fa-spinner"></i>;
  //   }
  return (
    <div
      className="modal fade"
      id="Modalnotice"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="ModalnoticeTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-body">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <div aria-hidden="true">&times;</div>
              </button>
            </div>
            {submitResult === true ? (
              <div>
                {serverError === "" ? (
                  <Fragment>
                    感謝您，我們已經收到訊息． <br />
                    待核對後會再傳送mail通知您核對結果．
                  </Fragment>
                ) : (
                  <Fragment>{serverError}</Fragment>
                )}
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setSubmitResult(false)}
                >
                  再次輸入
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <div>
                    <h3>［{gameName}］課程匯款回報</h3>
                    <h6>請填寫已完成的匯款資料</h6>
                    <input
                      type="text"
                      className="formcontrol"
                      id="checkId"
                      name="checkId"
                      ref={register({
                        required: "請填寫預約代號．",
                        maxLength: 20,
                      })}
                      placeholder="預約代號"
                    />
                    <code>{errors.checkId?.message}</code>
                    <input
                      type="text"
                      className="formcontrol"
                      name="wireName"
                      id="wireName"
                      ref={register({
                        required: "請填寫匯款帳戶名稱．",
                        maxLength: 20,
                      })}
                      placeholder="匯款帳戶名稱"
                    />
                    <code>{errors.wireName?.message}</code>
                    <input
                      type="text"
                      className="formcontrol"
                      name="bankName"
                      id="bankName"
                      ref={register({
                        required: "請填寫匯款銀行名稱．",
                        maxLength: 20,
                      })}
                      placeholder="匯款銀行名稱"
                    />
                    <code>{errors.bankName?.message}</code>
                    <input
                      type="text"
                      className="formcontrol"
                      name="bankCode"
                      id="bankCode"
                      ref={register({
                        required: "請填寫帳號後5碼．",
                        maxLength: 20,
                      })}
                      placeholder="帳號後5碼"
                    />
                    <code>{errors.bankCode?.message}</code>
                  </div>
                </div>
                {loading === false ? (
                  <button type="submit" className="btn btn-primary">
                    確認送出
                  </button>
                ) : (
                  <button type="button" className="btn btn-primary" disabled>
                    傳送資料中...
                  </button>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WireReportForm;
