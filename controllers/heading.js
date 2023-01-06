const Heading = require("../models/headings");

exports.changeHeading = async (req, res, next) => {
  const { value, area } = req.body;
  if (value === "" || area === "") {
    // res.status(400).json({msg:"Please enter the values",success:false});
    const error = new Error("Please enter the values");
    error.statusCode = 400;
    next(error);
  }

  const existingHeading = await Heading.findOne({ area });
  if (existingHeading) {
    existingHeading.value = value;
    existingHeading.current = value;
    await existingHeading.save();
    res.status(200).json({ msg: "Heading updated", success: true });
  } else {
    const newHeading = new Heading({
      value,
      area,
      current: value,
    });
    await newHeading.save();
    res.status(201).json({ msg: "Heading Created", success: true });
  }
};

exports.viewHeadings = async (req, res) => {
  const heading = await Heading.find();
  res.status(200).json({ heading, success: true });
};
