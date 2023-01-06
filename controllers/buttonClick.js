const Click = require("../models/buttonClicks");

exports.increaseCountOnClick = async (req, res, next) => {
  console.log(req.ip);
  const existingIp = await Click.findOne({ ip: req.ip });
  if (!existingIp) {
    const newClick = new Click({
      ip: req.ip,
      number: 1,
    });
    await newClick.save();
    res.status(201).json({ msg: "New user visited site", success: true });
  } else res.status(200).json({ msg: "User already visited", success: true });
};

exports.getTotalCount = async (req, res, next) => {
  const findAllIps = await Click.find();
  const sum = findAllIps.reduce((total, curr) => {
    return total + curr.number;
  }, 0);
  res.status(200).json({ sum, success: true });
};
