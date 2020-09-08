import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import axios from "axios";
import "./demand.css";
import AProgressSection from "./section/AProgressSection";
import BasicSection from "./section/BasicSection";
import BrandSection from "./section/BrandSection";
import ContactMethodSection from "./section/ContactMethodSection";
import CooperationSection from "./section/CooperationSection";
import FinalConfirmSection from "./section/FinalConfirmSection";
import { useHistory } from "react-router-dom";
const RequestServiceIndex = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const methods = useForm(); // initialise the hook

  let history = useHistory();
  //console.log(step);
  const onSubmit = (data) => {
    //e.preventDefault();
    //console.log("onSubmit", JSON.stringify(data));
    setLoading(true);
    axios
      .post("/api/service-request/", {
        ...data,
      })
      .then((res) => {
        //setLoading(false);
        //console.log("result", res.data);
        //const result = res.data;
        //const newId = result._id;
        //setSavedRecord(res.data);
        history.push(`/general?category=2&id=${res.data._id}`);
      })
      .catch((err) => {
        setLoading(false);
        console.log("err.result", err);
      });
    //setFormData({ ...formData, ...data });
    //setStep(step + 1);
    // if (area === "") {
    //   setError("area", {
    //     type: "manual",
    //     message: "請選擇居住地區",
    //   });
    //   return;
    // }
    // onNextStepClick({ ...data, area, game_id: gameId });
  };
  if (loading) {
    return (
      <div className="spinner-grow text-warning" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
  return (
    <div className="service-container section-container">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 service section-description wow fadeIn">
            <h2 style={{ marginTop: "93px" }}>
              <strong>網紅</strong> 流量服務
            </h2>
            <div className="divider-1 wow fadeInUp">
              <span></span>
            </div>
          </div>
        </div>
        <section id="find-kol-row-1">
          <div className="container">
            <div className="row justify-content-center mt-0">
              <div className="col-sm-12 text-center p-0 mb-2">
                <div className="px-0 pb-0 mb-3">
                  <div className="row">
                    <div className="col-md-12 px-0 mx-0">
                      <FormProvider {...methods}>
                        <form
                          id="msform"
                          onSubmit={methods.handleSubmit(onSubmit)}
                        >
                          <AProgressSection step={step} />
                          {/* <!--合作對象--> */}

                          <BasicSection
                            step={step}
                            setStep={() => setStep(2)}
                          />

                          {/* <!--品牌資訊--> */}
                          <BrandSection
                            step={step}
                            setStep={(n) => setStep(step + n)}
                          />

                          {/* <!--合作方式--> */}

                          <CooperationSection
                            step={step}
                            setStep={(n) => setStep(step + n)}
                          />

                          {/* <!--聯繫方式--> */}

                          <ContactMethodSection
                            step={step}
                            setStep={(n) => setStep(step + n)}
                          />

                          {/* <!--確認發送--> */}

                          <FinalConfirmSection
                            step={step}
                            setStep={(n) => setStep(step + n)}
                            loading={loading}
                          />
                        </form>
                      </FormProvider>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RequestServiceIndex;
