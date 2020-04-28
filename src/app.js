// const createError = require("http-errors");
const express = require("express");
const serverless = require("serverless-http");
const request = require("request");
var router = express.Router();
const cors = require("cors");

const app = express();

app.use(cors());

router.get("/getChromeChannels", function (req, res, next) {
  request(
    { url: "http://omahaproxy.appspot.com/all.json" },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: "error", message: err.message });
      }
      res.send(response);
    }
  );
});

router.get("/getChromedrivers", function (req, res, next) {
  request(
    { url: "http://storage.googleapis.com/chromedriver/" },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: "error", message: err.message });
      }
      res.send(response);
    }
  );
});

app.use("/.netlify/functions/app", router);

module.exports.handler = serverless(app);
