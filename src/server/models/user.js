const mongoose = require("mongoose");
const config = require("config");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 50
	},
	email: {
		type: String,
		unique: true,
		required: true,
		minlength: 5,
		maxlength: 255
	},
	password: {
		type: String,
		required: true,
		maxlength: 1024,
		minlength: 5
	},
	posts: [{
		type: mongoose.Schema.Types.ObjectId, ref: 'Posts'
	}],
});

userSchema.methods.generateAuthToken = function () {
	return jwt.sign({ _id: this._id, username: this.username }, config.get("jwtSecret"));
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
	const schema = Joi.object({
		username: Joi.string().min(5).max(50).required(),
		email: Joi.string().min(5).max(255).required().email(),
		password: Joi.string().min(5).max(1024).required()
	});
	return schema.validate(user);
}



module.exports.User = User;
module.exports.validateUser = validateUser;
