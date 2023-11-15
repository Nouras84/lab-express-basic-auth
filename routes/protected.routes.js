const router = require("express").Router();
const { isLoggedIn } = require("./middlewares/authMiddleware");

router.get("/main", isLoggedIn, (req, res, next) => {
  res.render("protected/main");
});

router.get("/private", isLoggedIn, (req, res, next) => {
  res.render("protected/private");
});

module.exports = router;
