const express = require("express");
const router = express.Router();
const authentication = require("../middleware/auth");
const { createPostValidator } = require("../middleware/expressValidator");
const getPosts = require("../postFunctions/createPost");
const createPost = require("../postFunctions/createPost");
const getSinglePost = require("../postFunctions/getSinglePost");
const getUserPostsById = require("../postFunctions/getUserPostsById");
const addLike = require("../postFunctions/addLike");
const removePost = require("../postFunctions/removePost");

router.get("/posts", getPosts);

router.post("/", authentication, createPostValidator, createPost);

router.put("/likes/:post_id", authentication, addLike);

router.delete("/delete_post/:post_id", authentication, removePost);

router.get("/single_post/:post_id", getSinglePost);

router.get("/user_posts/:user_id", getUserPostsById);