var express = require("express");
var router = express.Router();
var db = require("../public/conexion/conexion");
var jwt = require("jsonwebtoken");

router.get("/", function (req, res, next) {
  res.render("layouts/panelAdministrador", {
    title: "Panel de Administrador",
  });
});

module.exports = router;
