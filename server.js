const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");

const path = require("path");
require("dotenv").config();

const app = express();

// DB Config
const db = process.env.MongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use(morgan("tiny"));
app.use(helmet());
app.use(express.json());

//serve static assets if in production
if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "stage") {
  //set a static folder
  app.use(express.static("client/build"));
  //set a route for anything else not list above
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// app.get("/", function (req, res) {
//   res.send("hello, world!");
// });

// app.get("/api/contactus", function (req, res) {
//   res.send("hello, world!");
// });
app.use("/api/contactus", require("./routes/api/contactus"));

const port = process.env.PORT || 4936;

let server;
if (app.get("env") !== "production") {
  const http = require("http");
  server = http.createServer(app);
} else {
  var fs = require("fs");
  const https = require("https");
  var options = {
    key: fs.readFileSync(config.ssl_options.keyfile),
    cert: fs.readFileSync(config.ssl_options.certfile),
    ca: [fs.readFileSync(config.ssl_options.cafile)],
  };

  server = https.createServer(options, app);
}

server.listen(port, "0.0.0.0", function () {
  console.log("server env :" + app.get("env"));
  console.log("server is listening on:" + port);
});
