const mongoose = require("mongoose");
const Joi = require("joi");

const postSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	content: {
		type: String,
		required: true,
		maxlength: 140
	},
	date: {
		type: Date,
		default: Date.now
	},
	likes: [String]
});

const Post = mongoose.model("Post", postSchema);

function validatePosts(blog) {
	const schema = Joi.string().max(140).required();
	return schema.validate(blog);
}

module.exports.Post = Post;
module.exports.validatePosts = validatePosts;
