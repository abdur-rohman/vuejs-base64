const controllers = require("../controllers/posts");
const express = require("express");
const router = express.Router();

router.get("/", controllers.getAllPost);
router.post("/", controllers.createPost);
router.get("/image/:id", controllers.getPostImage);

module.exports = router;
