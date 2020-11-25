const Joi = require("joi");
const bcrypt = require("bcrypt");
const express = require("express");
const { User, validateUser } = require("../models/user");
const checkAuth = require("../middleware/auth");

const router = express.Router();

router.post("/signin", async (req, res) => {
	try {
		const { error } = validateLogin(req.body);
		if (error) return res.status(400).json({ error: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (!user) return res.status(400).json({ error: "Invalid email or password." });

		const validPassword = await bcrypt.compare(req.body.password, user.password);

		if (!validPassword) return res.status(400).json({ error: "Invalid email or password." });

		const token = user.generateAuthToken();

		return res
			.header("x-auth-token", token)
			.header("access-control-expose-headers", "x-auth-token")
			.json({ token });
	} catch (ex) {
		return res.status(500).json({ error: `Internal Server Error: ${ex}` });
	}
});

router.post("/signup", async (req, res) => {
	try {
		const { error } = validateUser(req.body);

		if (error) return res.status(400).json({ error: error.details[0].message });

		let user = await User.findOne({ email: req.body.email });
		if (user) return res.status(400).json({ error: "User already registered." });

		const salt = await bcrypt.genSalt(10);

		user = new User({
			username: req.body.username,
			email: req.body.email,
			password: await bcrypt.hash(req.body.password, salt)
		});

		await user.save();
		const token = user.generateAuthToken();

		return res
			.header("x-auth-token", token)
			.header("access-control-expose-headers", "x-auth-token")
			.json({ token });
	} catch (ex) {
		return res.status(500).json({ error: `Internal Server Error: ${ex}` });
	}
});

router.delete("/delete", checkAuth, async (req, res) => {
	try {
		await User.findByIdAndDelete(req.user._id);

		res.status(204).json({ message: "Deleted" });
	} catch (err) {
		res.status(400).json({ error: "Could not delete" });
	}
});

function validateLogin(req) {
	const schema = Joi.object({
		email: Joi.string().min(5).max(255).required().email(),
		password: Joi.string().min(5).max(1024).required()
	});
	return schema.validate(req);
}

module.exports = router;
