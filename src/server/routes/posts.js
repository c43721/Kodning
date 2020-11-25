const express = require("express");
const { Post } = require("../models/posts");
const checkAuth = require("../middleware/auth");
const postRouter = express.Router();

router.get("/api/posts", async (res) => {
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
    });  

router.put("/api/likes/:post_id", async (req, res) => {
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

router.delete("/api/delete_post/:post_id", async (req, res) => {
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

router.get("/api/single_post/:post_id", async (req, res) => {
        try {
        let posts = await Post.findById(req.params.post_id);
        res.json(posts);
        } catch (error) {
        console.error(error);
        return res.status(500).json("Server Error...");
        }
    });
    

router.get("/api/user_posts/:user_id", async (req, res) => {
        try {
        let posts = await Post.find({ user: req.params.user_id });
        res.json(posts);
        } catch (error) {
        console.error(error);
        return res.status(500).json("Server Error...");
        }
    });
  
    module.exports = postRouter;