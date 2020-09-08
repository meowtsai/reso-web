import React, { useState, useEffect, Fragment } from "react";
import { WOW } from "wowjs";
import axios from "axios";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import moment from "moment";
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
          if (res.data.contactMessage) {
            setContent(res.data.contactMessage);
          }
        })
        .catch((err) => {
          console.log(err.message);
          setError(err.message);
        });
    };
    const getServiceRequest = async (id) => {
      axios
        .get(`/api/service-request/request/${id}`)
        .then((res) => {
          console.log(res.data);
          if (res.data.request) {
            setContent(res.data.request);
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
        switch (urlQuery.category) {
          case "1":
            getContactMessage(urlQuery.id);
            break;
          case "2":
            getServiceRequest(urlQuery.id);
            break;
          default:
            break;
        }
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
  if (content.main_ideas) {
    contentComponet = ServiceRequestObject(content);
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

const ServiceRequestObject = (srvReqObj) => {
  return (
    <Fragment>
      <div className="service-box-icon">
        <i className="fa fa-check-circle text-success" aria-hidden="true"></i>
      </div>
      <h3>訊息傳送成功</h3>
      <div className="card text-left">
        感謝來信，我們已經接收到您送來的如下訊息
        <br />
        在近期將有專人與您聯絡:
        <table className="table table-striped">
          <thead>
            <tr>
              <th colSpan={2} scope="col">
                合作對象
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">類型</th>
              <td>
                {srvReqObj.categories.map((ca) => (
                  <li key={`category-${ca.key}`}>{ca.cht}</li>
                ))}
              </td>
            </tr>
            <tr>
              <th scope="row">平台</th>
              <td>
                {" "}
                <ul className="value">
                  {srvReqObj.platforms.map((ca) => (
                    <li key={`platform-${ca.key}`}>{ca.cht}</li>
                  ))}
                </ul>
              </td>
            </tr>
            <tr>
              <th scope="row">網紅性別</th>
              <td>{srvReqObj.genders.cht}</td>
            </tr>
            <tr>
              <th scope="row">總預算</th>
              <td> {srvReqObj.budget}</td>
            </tr>
            <tr>
              <th scope="row">網紅人數</th>
              <td> {srvReqObj.kolnumber}</td>
            </tr>
            <tr>
              <th colSpan={2} scope="col">
                品牌資訊
              </th>
            </tr>
            <tr>
              <th scope="row">品牌名稱</th>
              <td> {srvReqObj.brandname}</td>
            </tr>
            <tr>
              <th scope="row">商品名稱</th>
              <td> {srvReqObj.productname}</td>
            </tr>
            <tr>
              <th scope="row">商品連結</th>
              <td>
                {" "}
                <ul className="value">
                  <li>{srvReqObj.producturl1}</li>
                  {srvReqObj.producturl2 && <li>{srvReqObj.producturl2}</li>}
                  {srvReqObj.producturl3 && <li>{srvReqObj.producturl3}</li>}
                </ul>
              </td>
            </tr>
            <tr>
              <th colSpan={2} scope="col">
                合作方式
              </th>
            </tr>
            <tr>
              <th scope="row">合作規格</th>
              <td>
                {" "}
                <ul className="value">
                  {srvReqObj.formats.map((ca) => (
                    <li key={`formats-${ca.key}`}>{ca.cht}</li>
                  ))}
                </ul>
              </td>
            </tr>
            <tr>
              <th scope="row">預計檔期</th>
              <td>
                {" "}
                {moment(srvReqObj.date_start).format("YYYY-MM-DD")}~
                {moment(srvReqObj.date_end).format("YYYY-MM-DD")}
              </td>
            </tr>
            <tr>
              <th scope="row">想要推廣主軸</th>
              <td> {srvReqObj.main_ideas} </td>
            </tr>
            <tr>
              <th scope="row">特殊要求</th>
              <td>
                {" "}
                <ul className="value">
                  <li>
                    是否要需要開放廣告主投放 -{" "}
                    {srvReqObj.socialadperm === "Y"
                      ? `是(${srvReqObj.socialadperm_weeks}週)`
                      : "否"}{" "}
                  </li>
                  <li>
                    是否需要合作素材授權 -{" "}
                    {srvReqObj.mediaperm === "Y"
                      ? `是(${srvReqObj.mediaperm_weeks}週)`
                      : "否"}{" "}
                  </li>
                </ul>{" "}
              </td>
            </tr>
            <tr>
              <th colSpan={2} scope="col">
                聯繫方式
              </th>
            </tr>
            <tr>
              <th scope="row">公司名稱</th>
              <td>{srvReqObj.company}</td>
            </tr>
            <tr>
              <th scope="row">聯絡人</th>
              <td>{srvReqObj.name}</td>
            </tr>
            <tr>
              <th scope="row">聯絡人電話</th>
              <td>{srvReqObj.phone}</td>
            </tr>
            <tr>
              <th scope="row">E-Mail </th>
              <td>{srvReqObj.email}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};
