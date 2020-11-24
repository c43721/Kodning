const mongoose = require("mongoose");
const config = require("config");
const Joi = require("joi");
const jwt = require("jwtSecret");

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
    },
    content: {
        type: String, 
        required: true
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

module.exports.posts = Posts;
module.exports.validatePosts = validatePosts;