const User = require("../model/user")
const bcrypt = require("bcryptjs")
var validator = require("email-validator");
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const usersDataPath = path.join(__dirname, 'users.json');


// Helper function to read users data from a JSON file
function readUsersData() {
  const rawData = fs.readFileSync(usersDataPath, 'utf8');
  return JSON.parse(rawData);
}

exports.register = async (req, res, next) => {
  const { username, password, email } = req.body;

  // Read the existing user data from the JSON file
  const usersData = readUsersData();

  if (password.length < 6) {
    return res.status(400).json({ message: "Password less than 6 characters" });
  }

  if (!validator.validate(email)) {
    return res.status(400).json({ message: "Email is not correct" });
  }

  if (usersData.some((user) => user.email === email)) {
    return res.status(400).json({ message: "Email already exists" });
  }

  try {
    bcrypt.hash(password, 10).then(async (hash) => {
      // Create a new user object
      const newUser = {
        id: uuidv4(),
        username,
        password: hash,
        email,
      };

      // Add the new user to the existing data
      usersData.push(newUser);

      // Update the JSON file with the new data
      fs.writeFileSync(usersDataPath, JSON.stringify(usersData, null,2), 'utf8');

      return res.status(200).json({
        message: "User successfully created",
        user: newUser,
      });
    });
  } catch (err) {
    res.status(401).json({
      message: "User not successfully created",
      error: err.message,
    });
  }
};



exports.login = async (req, res, next) => {
  const { password, email } = req.body;

  // Check if username and password are provided
  if (!email || !password) {
    return res.status(400).json({
      message: "Email or Password not present",
    });
  }

  if (!validator.validate(email)) {
    return res.status(400).json({ message: "Email is not correct" });
  }

  // Read the existing user data from the JSON file
  const usersData = readUsersData();

  // Find the user by email in the data
  const user = usersData.find((userData) => userData.email === email);

  if (!user) {
    return res.status(400).json({
      message: "Login not successful",
      error: "User not found",
    });
  }

  // Compare the given password with the hashed password
  bcrypt.compare(password, user.password).then(function (result) {
    if (result) {
      // If the password matches, return the user object
      res.status(200).json({ user });
    } else {
      res.status(400).json({ message: "Login not successful" });
    }
  });
};


  

 