const mongoose = require ("mongoose");
const config = require ("config");
const Joi = require("joi");

const feedSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    date:{
        type:Date,
        default:Date.now(),
    },
    posts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Posts",
    }],


});


