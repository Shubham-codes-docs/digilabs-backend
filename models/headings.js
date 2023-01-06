const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const headingSchema = new Schema(
  {
    area: {
      type: String,
      required: true,
    },
    current: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Heading", headingSchema);
