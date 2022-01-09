var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

var CountSchema = new Schema({
  createCount: {
    type: Number,
    required: true,
  },
  updateCount: {
    type: Number,
    required: true,
  },
});

mongoose.model("Count", CountSchema);
