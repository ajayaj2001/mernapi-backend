var fieldsController = require("../controllers/fields.server.controller");

module.exports = function (app) {
  app.route("/api/").get(fieldsController.getFields);
  app.route("/api/create").post(fieldsController.createField);
  app.route("/api/update").post(fieldsController.updateField);
};
