const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const rfs = require("rotating-file-stream");
const path = require("path");
const fileUpload = require("express-fileupload");
require("dotenv").config();

const app = express();

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
      ],
      connectSrc: ["'self'", "https://www.google-analytics.com/"],
      mediaSrc: ["'self'", "https://assets.mixkit.co"],
      imgSrc: ["'self'", "data:", "https://www.google-analytics.com/"],
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
app.use("/api/contactus", require("./routes/api/contactus"));
app.use("/api/service-request", require("./routes/api/service-request"));
app.use("/api/course", require("./routes/api/course"));
app.use("/api/idvtwcampus", require("./routes/api/idvtwcampus"));

//serve static assets if in production
if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "stage") {
  //set a static folder
  app.use("/course", express.static(path.join(__dirname, "course/build")));
  app.use(
    "/idvtwcampus",
    express.static(path.join(__dirname, "h55-event/build"))
  );
  app.use(express.static("client/build"));
  //set a route for anything else not list above
  app.get("/course/*", (req, res) => {
    res.sendFile(path.join(__dirname + "/course/build/index.html"));
  });
  app.get("/idvtwcampus/*", (req, res) => {
    res.sendFile(path.join(__dirname + "/h55-event/build/index.html"));
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
