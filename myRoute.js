const express = require("express")
const router = express.Router()
const { register, login } = require("./Auth/auth")
const { createPost, getPosts, deletePost } = require("./models")
router.route("/register").post(register)
router.route("/login").post(login);
router.route("/createPost").post(createPost);
router.route("/getPosts").get(getPosts);
router.route("/deletePost").get(deletePost);

//router.route("/createpost").post(createpost)
module.exports = router