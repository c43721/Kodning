const { validationResult } = require("express-validator");
const Post = require("../../models/Posts");
const User = require("../../models/User");

module.exports = async (req, res) => {
  let { content } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  try {
    let user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json("User not found");

    let newPost = new Post({
      content,
      name: user.name,
    });

    await newPost.save();

    res.json("New post created!");
  } catch (error) {
    console.error(error);
    return res.status(500).json("Server Error...");
  }
};
