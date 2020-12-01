const express = require("express");
const checkAuth = require("../middleware/auth");
const { Post, validatePosts } = require("../models/post");
const { User } = require("../models/user");
const { getFriendsFromUser } = require("./friends");
const router = express.Router();

async function getUserPosts(userId) {
	const { posts } = await User.findById(userId);

	return posts;
}

router.use(checkAuth);

router.get("/", async (req, res) => {
	try {
		const userFriends = await getFriendsFromUser(req.user._id);

		const userPosts = await Post.find({}).where({ user: req.user._id });
		const userFriendPosts = await userFriends.map(async friend => await getUserPosts(friend));

		const userPostArray = [...userPosts, ...userFriendPosts].sort(
			(post1, post2) => post2.date - post1.date
		);

		res.json(userPostArray);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Server Error..." });
	}
});

router.post("/", async (req, res) => {
	const { content } = req.body;
	const { error: er } = validatePosts(content);
	if (er) return res.status(400).json({ error: er });
	try {
		const newPost = new Post({
			content,
			name: req.user.username
		});

		await newPost.save();

		return res.json({ post: newPost });
	} catch (error) {
		console.error(error);
		return res.status(500).json("Server Error...");
	}
});

router.put("/likes/:post_id", async (req, res) => {
	try {
		const post = await Post.findById(req.params.post_id);

		if (!post) return res.status(404).json("Post not found");

		if (post.likes.find(like => like.username === req.user._id))
			return res.status(401).json({ error: "You already liked this post!" });

		const newLike = {
			user: req.user._id
		};

		post.likes.push(newLike);

		await post.save();

		res.json(post);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Server Error..." });
	}
});

router.delete("/:post_id", async (req, res) => {
	try {
		const post = await Post.findById(req.params.post_id);

		if (!post) return res.status(404).json({ error: "Not found" });

		if (post.user._id !== req.user._id) return res.status(401).json({ error: "Unauthorized!" });

		await post.remove();

		res.json({ meessage: "Post has been removed!" });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Server Error..." });
	}
});

module.exports = router;
