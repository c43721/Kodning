const express = require("express");
const router = express.Router();
const authentication = require("../middleware/auth");
const { createPostValidator } = require("../middleware/expressValidator");
const getPosts = require("../backendFunctions/createPost");
const createPost = require("../backendFunctions/createPost");

router.get("/posts", getPosts);

router.post("/", authentication, createPostValidator, createPost);
