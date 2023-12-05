var express = require("express");
var router = express.Router();
/* GET home page.(login.ejs) */
router.get("/", function (req, res, next) {
  res.render("layouts/login", { title: "Iniciar Sesión" });
});



module.exports = router;
