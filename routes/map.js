var express = require("express");
var router = express.Router();
var db = require("../conexion/conexion");



/* GET home page.(map.ejs) */
router.get("/", function (req, res, next) {
  res.render("map", { title: "" });
});

module.exports = router;
