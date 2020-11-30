const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

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
        default: Date.now()
    },
    likes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId, 
                ref: "User",
            }
        }
    ]
});

postSchema.methods.generateAuthToken = function () {
	return jwt.sign({ _id: this._id, username: this.username }, config.get("jwtSecret"));
};

const Posts = mongoose.model("Post", postSchema);

function validatePosts(blog) {
	const schema = Joi.object({
        user: Joi.type().ref(),
		content: Joi.string().maxlength(140).required(),		
        date: Joi.date(),
        likes: Joi.user()
	});
	return schema.validate(blog);
}

module.exports.Posts = Posts;
module.exports.validatePosts = validatePosts;