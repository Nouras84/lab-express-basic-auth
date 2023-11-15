const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");

// Signup route
router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.render("auth/signup", { errorMessage: "All fields are required." });
    return;
  }

  try {
    const foundUser = await User.findOne({ username });
    if (foundUser) {
      res.render("auth/signup", { errorMessage: "Username already exists." });
      return;
    }

    const newUser = await User.create({ username, password });
    res.redirect("/");
  } catch (error) {
    next(error);
  }
});

// Login routes
router.get("/login", (req, res, next) => {
  res.render("auth/login");
});

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.render("auth/login", { errorMessage: "All fields are required." });
    return;
  }

  try {
    const user = await User.findOne({ username });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      res.render("auth/login", {
        errorMessage: "Incorrect username or password.",
      });
      return;
    }

    req.session.currentUser = user; // Assuming session middleware is already set up
    res.redirect("/");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
