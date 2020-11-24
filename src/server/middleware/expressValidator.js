const { check } = require("express-validator");

module.exports.createPostValidator = [
    check("content", "Text is required").not().isEmpty(),
  ];
  