const User = require("../model/user")
const bcrypt = require("bcryptjs")
var validator = require("email-validator");



exports.register = async (req, res, next) => {
    const { username, password, email } = req.body
    if (password.length < 6) {
      return res.status(400).json({ message: "Password less than 6 characters" })
    }
    if(!validator.validate(email)){
      return res.status(400).json({ message: "email is not correct" })
    }
    if(await User.findOne({ email })){
      return res.status(400).json({ message: "email is exsit" })
    }
    try {
      bcrypt.hash(password, 10).then(async (hash) => {
        await User.create({
          username,
          password: hash,
          email
        })
          .then((user) =>
            res.status(200).json({
              message: "User successfully created",
               user,
            })
          )
          .catch((error) =>
            res.status(400).json({
              message: "User not successful created",
              error: error.message,
            })
          );
      });
    } catch (err) {
      res.status(401).json({
        message: "User not successful created",
        error: error.mesage,
      })
    }
  }


  exports.login = async (req, res, next) => {
    const {password, email } = req.body
    // Check if username and password is provided
    if (!email || !password) {
      return res.status(400).json({
        message: "Username or Password not present",
      })
    }
    if(!validator.validate(email)){
      return res.status(400).json({ message: "email is not correct" })
    }
    try {
      const user = await User.findOne({ email })
      if (!user) {
        res.status(400).json({
          message: "Login not successful",
          error: "User not found",
        })
      } else {
        user._id = user.id
        // comparing given password with hashed password
        bcrypt.compare(password, user.password).then(function (result) {
          result
            ? res.status(200).json({
                user,
              })
            : res.status(400).json({ message: "Login not succesful" })
        })
      }
    } catch (error) {
      res.status(400).json({
        message: "An error occurred",
        error: error.message,
      })
    }
  } 

  

 