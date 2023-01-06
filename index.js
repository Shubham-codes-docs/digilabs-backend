const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const multer = require("multer");
const firebaseStorage = require("multer-firebase-storage");

const headingRoute = require("./routes/heading");
const clickRoute = require("./routes/click");

const app = express();
app.use(cors());

const firebaseConfig = {
  bucketName: "digilabs-28462.appspot.com",
  credentials: {
    privateKey: process.env.FIREBASE_PRIVATE_KEY
      ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/gm, "\n")
      : undefined,
    projectId: "digilabs-28462",
    clientEmail: process.env.FIREBASE_EMAIL,
  },
};

mongoose.set("strictQuery", false);
app.use(express.json());

app.use("/api/heading", headingRoute);
app.use("/api/click", clickRoute);

app.put(
  "/api/upload-image",
  multer({ storage: firebaseStorage(firebaseConfig) }).single("image"),
  (req, res) => {
    res.status(200).json({ file: req.file, success: true });
  }
);

const PORT = process.env.PORT || 5000;

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
