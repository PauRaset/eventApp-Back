const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.loginWithInstagram = async (req, res) => {
  const { instagramId, name, profileImage, email } = req.body;

  let user = await User.findOne({ instagramId });
  if (!user) {
    user = new User({ instagramId, name, profileImage, email });
    await user.save();
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.json({ token, user });
};
