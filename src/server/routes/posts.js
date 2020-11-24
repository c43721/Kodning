const express = require("express");
const router = express.Router();
const authentication = require("../middleware/auth");

const getPosts = require("../postFunctions/getPosts");

router.get("/posts", getPosts);