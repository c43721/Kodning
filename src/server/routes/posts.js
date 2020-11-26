const express = require("express");
const checkAuth = require("../middleware/auth");
const { Posts, validatePosts } = require("../models/posts");
const router = express.Router();

router.use(checkAuth);

router.get("/", async (res) => {
    try {
        let posts = await Post.find();
        res.json(posts);
    } catch (error) {
        console.error(error);
        return res.status(500).json("Server Error...");
    }
});

router.post("/", async (req, res) => {
    let { content } = req.body;
    const errors = validatePosts(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
    try {
        let user = await User.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json("User not found");

        let newPost = new Posts({
            content,
            name: user.name,
            date: Date
        });

        await newPost.save();

        res.json({ message: "New post created!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json("Server Error...");
    }
});

router.put("/likes/:id", async (req, res) => {
    try {
        let post = await Post.findById(req.params.post_id);

        if (!post) return res.status(404).json("Post not found");

        if (post.likes.find((like) => like.user.toString() === req.user.id))
            return res.status(401).json("You already liked this post!");

        let newLike = {
            user: req.user.id,
        };

        post.likes.unshift(newLike);

        await post.save();

        res.json(post);
    } catch (error) {
        console.error(error);
        return res.status(500).json("Server Error...");
    }
});

router.delete("/:post_id", async (req, res) => {
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
});

router.get("/:post_id", async (req, res) => {
    try {
        let posts = await Post.findById(req.params.post_id);
        res.json(posts);
    } catch (error) {
        console.error(error);
        return res.status(500).json("Server Error...");
    }
});

router.get("/:user_id", async (req, res) => {
    try {
        let posts = await Post.find({ user: req.params.user_id });
        res.json(posts);
    } catch (error) {
        console.error(error);
        return res.status(500).json("Server Error...");
    }
});

function getPosts(user) {
    // get user from DB (User.findById)
    // get posts 
    // return posts
}

module.exports = router;