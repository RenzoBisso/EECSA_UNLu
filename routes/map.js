var express = require("express");
var router = express.Router();
var db = require("../public/conexion/conexion");

/* GET home page.(map.ejs) */
router.get("/", function (req, res, next) {
  res.render("map", { title: "" });
});

module.exports = router;
