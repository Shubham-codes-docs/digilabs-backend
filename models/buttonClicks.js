const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const clickSchema = new Schema(
  {
    ip: {
      type: String,
    },
    number: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Click", clickSchema);
