const Logo = require("../models/logo");

exports.changeImage = async (req, res, next) => {
  const { image } = req.body;
  if (image === "") {
    // res.status(400).json({msg:"Please enter the values",success:false});
    const error = new Error("Please enter the values");
    error.statusCode = 400;
    next(error);
  }

  const existingLogo = await Logo.findOne();
  if (existingLogo) {
    existingLogo.imageUrl = image;
    await existingLogo.save();
    res.status(200).json({ msg: "Logo updated", success: true });
  } else {
    const newLogo = new Logo({
      imageUrl: image,
    });
    await newLogo.save();
    res.status(201).json({ msg: "Logo Created", success: true });
  }
};
