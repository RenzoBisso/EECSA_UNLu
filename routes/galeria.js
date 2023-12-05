var express = require("express");
var router = express.Router();
var db = require("../conexion/conexion");
const base64 = require("base64-js");

/* GET home page.(galeria.ejs) */
router.get("/", function (req, res, next) {
  db.query("SELECT imagen FROM galeria", function (err, result) {
    if (err) {
      console.error("Error al obtener datos de la base de datos:", err);
      return next(err);
    }
    function resizeImage(buffer) {
      return sharp(buffer).resize(200, 200).toBuffer();
    }
    function bufferToBase64(buffer) {
      const uint8Array = new Uint8Array(buffer);
      const base64String = base64.fromByteArray(uint8Array);
      return base64String;
    }
    const imagenesBase64 = result.map((row) => {
      const base64String = bufferToBase64(row.imagen);
      return base64String;
    });

    res.render("layouts/galeria", {
      title: "Galeria",
      imagenesBase64: imagenesBase64,
    });
  });
});
module.exports = router;
