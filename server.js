const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const rfs = require("rotating-file-stream");
const path = require("path");
const fileUpload = require("express-fileupload");
const requestIp = require("request-ip");
require("dotenv").config();

const app = express();
app.set("view engine", "pug");
// DB Config
const db = process.env.MongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// create a rotating write stream
const accessLogStream = rfs.createStream("access.log", {
  size: "10M", // rotate every 10 MegaBytes written
  interval: "1d", // rotate daily
  compress: "gzip", // compress rotated files
  path: path.join(__dirname, "log"),
});

app.use(morgan("combined", { stream: accessLogStream }));
app.use(helmet());

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", "'unsafe-inline'", "data:"],
      scriptSrc: [
        "'self'",
        "'unsafe-inline'",
        "'unsafe-eval'",
        "https://use.fontawesome.com",
        "https://cdnjs.cloudflare.com",
        "https://stackpath.bootstrapcdn.com/",
        "https://www.googletagmanager.com/",
        "https://www.google-analytics.com/",
        "https://ajax.googleapis.com/",
        "https://connect.facebook.net/",
      ],

      connectSrc: [
        "'self'",
        "https://www.google-analytics.com/",
        "https://analytics.google.com/",
      ],
      mediaSrc: ["'self'", "https://assets.mixkit.co"],
      imgSrc: [
        "'self'",
        "data:",
        "https://www.google-analytics.com/",
        "blob:",
        "https://www.google.com.tw/",
        "https://www.resound.global/",
      ],
      fontSrc: ["'self'", "data:"],
    },
  })
);

app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    abortOnLimit: true,
    responseOnLimit: "檔案太大",
    limitHandler: function (req, res, next) {
      //console.log("hi");
      return res.status(413).send({ file01: "檔案太大" });
    },
  })
);

app.use(express.json());
app.use(requestIp.mw());
//check if ip is in whitelist
app.use(function (req, res, next) {
  const white_list = require("./config/cosplay").white_list;
  const found = white_list.find((item) => item.ip === req.clientIp);

  if (found) {
    req.whitelisted = true;
  } else {
    req.whitelisted = false;
  }
  //console.log("req.whitelisted", req.clientIp);
  next();
});

app.use("/api/contactus", require("./routes/api/contactus"));
app.use("/api/service-request", require("./routes/api/service-request"));
app.use("/api/course", require("./routes/api/course"));
app.use("/api/mentor", require("./routes/api/mentor"));
app.use("/api/idvtwcampus", require("./routes/api/idvtwcampus"));
app.use("/api/cosplay", require("./routes/api/cosplay"));
app.use("/uploads/h55", express.static("uploads/h55"));
app.use("/uploads/cosplay", express.static("uploads/cosplay"));

app.use("/login/facebook", require("./routes/fb_login_result"));
app.use("/fbshare", require("./routes/fb_share"));
app.use("/youtube_who", require("./routes/fb_pixel"));
app.use("/public", express.static("public"));
//serve static assets if in production
if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "stage") {
  //set a static folder
  //app.use("/course", express.static(path.join(__dirname, "mentors/live")));
  app.use(
    "/idvtwcampus",
    express.static(path.join(__dirname, "h55-event/build"))
  );

  app.use("/mentors", express.static(path.join(__dirname, "mentors/live")));

  //

  app.use(
    "/cosplay",
    express.static(path.join(__dirname, `client-events/cosplay/live`))
  );

  app.get("/cosplay/*", (req, res) => {
    res.sendFile(
      path.join(__dirname + "/client-events/cosplay/live/index.html")
    );
  });

  app.use(express.static("client/build"));
  //set a route for anything else not list above
  app.get("/course/*", (req, res) => {
    //res.sendFile(path.join(__dirname + "/mentors/live/index.html"));
    res.redirect("/mentors");
  });
  app.get("/idvtwcampus/*", (req, res) => {
    res.sendFile(path.join(__dirname + "/h55-event/build/index.html"));
  });
  app.get("/mentors/*", (req, res) => {
    res.sendFile(path.join(__dirname + "/mentors/live/index.html"));
  });

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 4936;

let server;
if (app.get("env") !== "production") {
  const http = require("http");
  server = http.createServer(app);
} else {
  var fs = require("fs");
  const https = require("https");
  var options = {
    key: fs.readFileSync(process.env.SSL_keyfile),
    cert: fs.readFileSync(process.env.SSL_certfile),
    ca: [fs.readFileSync(process.env.SSL_cafile)],
  };

  server = https.createServer(options, app);
}

server.listen(port, "0.0.0.0", function () {
  console.log("server env :" + app.get("env"));
  console.log("server is listening on:" + port);
});
