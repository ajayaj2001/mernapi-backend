var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

var FieldSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
});

mongoose.model("Field", FieldSchema);
