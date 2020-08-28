import React, { useState, useEffect, Fragment } from "react";
import { WOW } from "wowjs";
import axios from "axios";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
const BlankIndex = () => {
  let location = useLocation();
  const [content, setContent] = useState({});
  const [error, setError] = useState(null);
  //console.log("content", content);
  useEffect(() => {
    const getContactMessage = async (id) => {
      axios
        .get(`/api/contactus/message/${id}`)
        .then((res) => {
          //console.log(res.data);
          if (res.data.contactMessage) {
            setContent(res.data.contactMessage);
          }
        })
        .catch((err) => {
          console.log(err.message);
          setError(err.message);
        });
    };

    if (location?.search) {
      const urlQuery = queryString.parse(location.search);
      if (urlQuery.category) {
        getContactMessage(urlQuery.id);
      }
    }

    const wow = new WOW({
      offset: 100,
      mobile: false,
      live: false,
    });

    wow.init();
  }, [location.search]);

  let contentComponet = (
    <Fragment>
      <div className="service-box-icon">
        <i className="fa fa-times-circle" aria-hidden="true"></i>
      </div>
      <h3>施工中</h3>
      <p>頁面還在製作中</p>
    </Fragment>
  );
  if (error) {
    contentComponet = (
      <Fragment>
        <div className="service-box-icon">
          <i className="fa fa-exclamation text-danger" aria-hidden="true"></i>
        </div>
        <h3>喔喔!</h3>
        <p>無法處理您的請求</p>
      </Fragment>
    );
  }
  if (content.message) {
    contentComponet = (
      <Fragment>
        <div className="service-box-icon">
          <i className="fa fa-check-circle text-success" aria-hidden="true"></i>
        </div>
        <h3>訊息傳送成功</h3>
        <div className="card text-left">
          感謝來信，我們已經接收到您送來的如下訊息
          <br />
          在近期將有專人與您聯絡:
          <ul className="list-group list-group-flush text-left">
            <li className="list-group-item">
              <strong>姓名:</strong>
              {content.name}
            </li>
            <li className="list-group-item">
              <strong>email:</strong>
              {content.email}
            </li>
            <li className="list-group-item">
              <strong>公司:</strong>
              {content.company}
            </li>
            <li className="list-group-item">
              <strong>電話:</strong>
              {content.phone}
            </li>
            <li className="list-group-item">
              <strong>訊息:</strong>
              {content.message}
            </li>
          </ul>
        </div>
        <p></p>
      </Fragment>
    );
  }
  return (
    <div className="service-container print-container">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 service section-description wow fadeIn">
            {" "}
          </div>
        </div>
        <div className="print">{contentComponet}</div>
        <div className="col-sm-12 wow fadeInUp">
          {" "}
          <a className="btn-link-1" href="/">
            回首頁
          </a>{" "}
        </div>
      </div>
    </div>
  );
};

export default BlankIndex;
