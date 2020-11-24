const Post = require("../../models/");

module.exports = async (req, res) => {
  try {
    let post = await Post.findById(req.params.post_id);

    if (!post) return res.status(404).json("Not found");

    if (post.user.toString() !== req.user.id.toString())
      return res.status(401).json("Unauthorized!");

    await post.remove();

    res.json("Post has been removed!");
  } catch (error) {
    console.error(error);
    return res.status(500).json("Server Error...");
  }
};
