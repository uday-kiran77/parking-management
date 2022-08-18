// config
require("../db");

var jwt = require("jsonwebtoken");
const express = require("express");
var validator = require("validator");
const bcrypt = require("bcrypt");

const User = require("../models/User");

const router = new express.Router();
router.get("/", (req, res) => {
  res.send("Hello");
});
router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(401)
        .send({ status: "error", message: "Invalid Username or Password!" });

    const matchPasswords = await bcrypt.compare(password, user.password);

    if (!matchPasswords)
      return res
        .status(401)
        .json({ status: "error", message: "Invalid Email or Password!" });

    const token = generateToken({ email: user.email, role: user.role });
    return res.status(200).json({
      token,
      role: user.role,
      name: user.fName + " " + user.lName,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send("Internal Server Error");
  }
});

router.post("/register", async (req, res) => {
  const email = req.body.email;
  const fName = req.body.fName;
  const lName = req.body.lName;
  const password = req.body.password;

  if (!email || !fName || !lName || !password)
    return res
      .status(400)
      .json({ status: "error", message: "All Fields Are Required!" });

  const error = [];

  // validate  data
  if (!validator.isEmail(email)) error.push("Invalid Email Address");
  if (fName.length === 0 && lName.length === 0) error.push("Invalid Name");
  if (password.trim().length < 6) error.push("Minimum Password length is 6");

  // if error return 400 status
  if (error.length !== 0)
    return res.status(400).json({ status: "error", message: error.join("/n") });

  // register user

  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res
        .status(401)
        .send({ status: "error", message: "Email Already Exists!" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await new User({
      email,
      fName,
      lName,
      password: hashedPassword,
      role: "USER",
    });
    await user.save();
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal Server Error");
  }

  res.status(201).json({ status: "ok", message: "Registered Successfully" });
});

router.post("/verify", (req, res) => {
  const token = req.body.token;
  if (!token) return res.status(401).send("Authorization Required!");
  try {
    const verify = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = User.findOne({ email: verify.email });
    if (user) return res.status(200).send();
    else return res.status(404).send();
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

function generateToken(user) {
  return jwt.sign(user, process.env.JWT_SECRET_KEY);
}

module.exports = router;
