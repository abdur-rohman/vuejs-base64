const mongoose = require("mongoose");

module.exports = mongoose.model(
  "posts",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    created_ad: {
      type: String,
    },
  })
);
