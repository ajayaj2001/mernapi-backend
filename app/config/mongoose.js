var mongoose = require("mongoose");

module.exports = function () {
  mongoose.Promise = global.Promise;
  db = mongoose
    .connect(process.env.MONGODB_KEY, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then(
      function () {
        console.log("Connected to database successfully");
      },
      function (err) {
        console.log("Database connection timeout error", err);
      }
    );

  require("../modules/fields/models/field.server.model");
  require("../modules/fields/models/count.server.model");

  return db;
};
