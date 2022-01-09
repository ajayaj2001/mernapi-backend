var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var glob = require("glob");

module.exports = function () {
  var app = express();

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, access_token"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "PUT, GET, POST, OPTIONS, DELETE"
    );
    next();
  });

  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

  app.use(bodyParser.json());

  // Adding all routes from modules by passing app to the routes with the help of glob
  glob(
    path.dirname(require.main.filename) + "/app/modules/**/routes/*.js",
    function (err, files) {
      if (files && files.length) {
        files.forEach(function (file) {
          require(file)(app);
        });
      }
    }
  );

  return app;
};
