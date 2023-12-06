var express = require("express");
var router = express.Router();
var db = require("../public/conexion/conexion");
var { devolverImagen } = require("../public/src/controllers/imageController");

/* GET home page (galeria.ejs) */
router.get("/", function (req, res, next) {
  db.query("SELECT imagen FROM aportaciones", function (err, result) {
    if (err) {
      console.error("Error al obtener datos de la base de datos:", err);
      return next(err);
    }

    var imagenesBase64 = devolverImagen(result);
    res.render("layouts/galeria", {
      title: "Galeria",
      imagenesBase64: imagenesBase64,
    });
  });
});

module.exports = router;
