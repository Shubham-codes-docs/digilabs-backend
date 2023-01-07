const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
const aws = require("aws-sdk");
const multer_s3 = require("multer-s3");
const { v4: uuidv4 } = require("uuid");

const headingRoute = require("./routes/heading");
const clickRoute = require("./routes/click");

const app = express();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS,GET,POST,PUT,PATCH,DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});
dotenv.config();
app.use(cors());

app.use((error, req, res, next) => {
  console.log(error);
});

const s3Config = new aws.S3({
  secretAccessKey: process.env.AWS_Secret_Key,
  accessKeyId: process.env.AWS_Access_Key_Id,
  region: "ap-south-1",
  BUCKET: process.env.BUCKET_NAME,
});

const multers3Config = multer_s3({
  s3: s3Config,
  bucket: process.env.BUCKET_NAME,
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    cb(null, "public/" + uuidv4() + "-" + file.originalname);
  },
});

const filefilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/webp"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

mongoose.set("strictQuery", false);
app.use(express.json());

app.use("/api/heading", headingRoute);
app.use("/api/click", clickRoute);

app.put(
  "/api/upload-image",
  multer({ storage: multers3Config, fileFilter: filefilter }).single("image"),
  (req, res) => {
    res.status(200).json({ file: req.file.key, success: true });
  }
);

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Database connected");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
