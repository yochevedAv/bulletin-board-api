const express = require("express")
const router = express.Router()
const { register, login } = require("./Auth/auth")
const { createPost } = require("./models")
router.route("/register").post(register)
router.route("/login").post(login);
router.route("/createPost").post(createPost);
//router.route("/createpost").post(createpost)
module.exports = router