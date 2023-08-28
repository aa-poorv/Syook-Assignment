const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const User = require("../models/user");
const { signAccessToken } = require("../helper/jwt_helper");
const { sign } = require("jsonwebtoken");

// router.get("/signin", verifyAccessToken, (req, res) => {
//   if (req.userId) return res.redirect("/");
//   return res.render("signin", { messages: req.flash("error") });
// });

// router.get("/signup", verifyAccessToken, (req, res) => {
//   if (req.userId) return res.redirect("/");
//   return res.render("signup");
// });

router.post("/signup", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  const token = await signAccessToken(user.id);
  req.session.token = token;
  return res.send("New User Login Success");
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const validUser = await User.checkUser(email, password);
  if (validUser) {
    const token = await signAccessToken(validUser.id);
    req.session.token = token;
    return res.send("Welcome to the user");
  } else {
    // req.flash("error", "Invalid email or password");
    // res.redirect("/user/signin");
    res.createError(403);
  }
});

router.get("/logout", async (req, res) => {
  if (!req.session.token) return createError.BadRequest();
  req.session.destroy();
  res.send("logout out of user");
});

module.exports = router;
