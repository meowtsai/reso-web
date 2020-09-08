const express = require("express");
const router = express.Router();
const ServiceRequest = require("../../models/ServiceRequests");
const { ServiceCategory } = require("../../models/ServiceCategories");
const { ServiceFormat } = require("../../models/ServiceFormats");
const { ServiceGender } = require("../../models/ServiceGenders");

const { ServiceGoal } = require("../../models/ServiceGoals");
const { ServicePlatform } = require("../../models/ServicePlatforms");
const moment = require("moment");
const sgMail = require("@sendgrid/mail");
router.get("/test", async (req, res) => {
  res.json({ msg: "ServiceRequest API Route works" });
});

///api/service-request/request/${id}
router.get("/request/:id", (req, res) => {
  ServiceRequest.findOne({ _id: req.params.id })
    .populate(["categories", "platforms", "goals", "formats", "genders"])
    .then((msg) => {
      // console.log(msg);
      // console.log(msg.platforms.cht);
      return res.json({ request: msg });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ msg: err.message });
    });
});

// {"socialadperm":"Y","categories":["3","5"],"platforms":["youtube"],"genders":"all","budget":"1","kolnumber":"1","goals":["members"],"brandname":"嘎嘎拉拉","productname":"喀拉喀拉","producturl1":"1","producturl2":"","producturl3":"","formats":["story"],"date_start":"2020-09-08","date_end":"2020-09-11","main_ideas":"1211","mediaperm":"N","company":"連連落落","name":"蔡","phone":"0926568279","email":"shihfan.tsai@gmail.com","socialadperm_weeks":"2"}
// url: /api/service-request/
// method: POST
// receive data from service request form
router.post("/", async (req, res) => {
  //validation
  //console.log(req.body);
  const {
    categories,
    platforms,
    genders,
    formats,
    budget,
    kolnumber,
    goals,
    brandname,
    productname,
    name,
    phone,
    email,
    socialadperm,
    socialadperm_weeks,
    mediaperm,
    mediaperm_weeks,
    main_ideas,
    producturl1,
    producturl2,
    producturl3,
    date_start,
    date_end,
    company,
  } = req.body;
  let errors = [];
  // check required fields
  if (!name || !email || !phone || !main_ideas) {
    errors.push({ msg: "請輸入所有欄位" });
  }
  if (errors.length > 0) {
    res.json({ errprs });
  } else {
    const categoriesObj = await ServiceCategory.find({
      key: { $in: categories },
    });
    const platformsObj = await ServicePlatform.find({
      key: { $in: platforms },
    });
    const genderObj = await ServiceGender.findOne({ key: genders });
    const formatsObj = await ServiceFormat.find({ key: { $in: formats } });
    const goalsObj = await ServiceGoal.find({ key: { $in: goals } });

    const requestObject = {
      categories: categoriesObj,
      platforms: platformsObj,
      genders: genderObj,
      formats: formatsObj,
      budget,
      kolnumber,
      goals: goalsObj,
      brandname,
      productname,
      name,
      phone,
      email: email.toLowerCase(),
      socialadperm: socialadperm === "Y" ? true : false,
      socialadperm_weeks,
      mediaperm: mediaperm === "Y" ? true : false,
      mediaperm_weeks,
      main_ideas,
      producturl1,
      producturl2,
      producturl3,
      date_start,
      date_end,
      ip: req.ip,
      company,
    };

    //console.log(requestObject);

    const newRequest = new ServiceRequest(requestObject);

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    newRequest
      .save()
      .then((request) => {
        //console.log("request save result", request);
        const fs = require("fs");
        let html_template = fs.readFileSync(__dirname + "/mail.html", "utf8");
        const msg = `有人透過呼聲網站的<strong>我要發案</strong>頁面傳送以下訊息<br /><hr />
        <div>
        <h3>合作對象</h3>
          <h4>類型</h4> 
          <ul className="value">
            ${categories.map(
              (ca) => `<li key=${`category-${ca.key}`}>${ca.cht}</li>`
            )}
          </ul>
         
        </div>
        <div>
          <h4>平台</h4> 
          <ul className="value">
            ${platforms.map(
              (ca) => `<li key=${`platforms-${ca.key}`}>${ca.cht}</li>`
            )}
          </ul>
         
         
        </div>
        <div>
          <h4>網紅性別</h4>
          
          ${genders.cht}
        </div>
        <div>
          <h4>總預算</h4> ${budget}
        </div>
        <div>
          <h4>網紅人數</h4> ${kolnumber}
        </div>
        <div>
          <h4>合作目標</h4> 
          <ul className="value">
          ${goals.map((ca) => `<li key=${`goals-${ca.key}`}>${ca.cht}</li>`)}
        </ul>
          
        
        </div>

        <h3>品牌資訊</h3>
        <div>
          <h4>品牌名稱</h4> ${brandname}
        </div>
        <div>
          <h4>商品名稱</h4> ${productname}
        </div>
        <div>
          <h4>商品連結</h4> ${producturl1},${producturl1},${producturl1}
        </div>

        <h3>合作方式</h3>
        <div>
          <h4>合作規格</h4> 
         
        <ul className="value">
        ${formats.map((ca) => `<li key=${`formats-${ca.key}`}>${ca.cht}</li>`)}
      </ul>
        </div>
        <div>
          <h4>預計檔期</h4> ${date_start} ~ ${date_end}
        </div>
        <div>
          <h4>想要推廣主軸</h4> ${main_ideas}
        </div>
        <div>
        <h4>特殊要求</h4>
        是否要需要開放廣告主投放: <li> ${
          socialadperm === "Y" ? `是(${socialadperm_weeks}週)` : "否"
        }</li>
        <li>是否需要合作素材授權 - ${
          mediaperm === "Y" ? `是(${mediaperm_weeks}週)` : "否"
        }</li>
      </div>
      <h3>聯繫方式</h3>
        <div>
          <h4>公司名稱</h4> ${company}
        </div>
        <div>
          <h4>聯絡人</h4> ${name}
        </div>
        <div>
          <h4>聯絡人電話</h4> ${phone}
        </div>
        <div>
          <h4>E-Mail</h4> ${email}
        </div>

         <br />時間:${moment().format(
           "MMMM Do YYYY, h:mm:ss a"
         )}<br />(參考單號: ${request._id})`;

        html_template = html_template.replace("{{msg}}", msg);

        const mailContent = {
          to: process.env.CONTACT_MAIL_TO,
          from: process.env.CONTACT_MAIL_FROM,
          subject: `${name}透過呼聲網站傳送發案請求`,
          text: `有人透過呼聲網站的我要發案頁面傳送以下訊息\\n------------------------\\n姓名:${name}\\n
      公司:${company}\\n
      聯絡mail:${email}\\n
      聯絡電話:${phone}\\n
      訊息內容:${main_ideas}\\n`,
          html: html_template,
        };

        //console.log("mailContent", mailContent);
        sgMail.send(mailContent).then(
          (sendResult) => {
            //console.log("mail send result", sendResult);
          },
          (error) => {
            console.error(error);

            if (error.response) {
              console.error(error.response.body);
            }
          }
        );
        res.json(request);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ msg: err.message });
      });
  }
});

module.exports = router;
