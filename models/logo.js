const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const logoSchema = new Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Logo", logoSchema);
