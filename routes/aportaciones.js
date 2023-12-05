var express = require("express");
var router = express.Router();
var db = require("../conexion/conexion");
const multer = require("multer");
const {
  imagen: uploadImagen, // Cambié el nombre para evitar conflictos
} = require("../public/src/controllers/imageController");

var fecha = require("../public/src/controllers/dateController");
var imagen = require("../public/src/controllers/imageController");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/* GET home page.(aportaciones.ejs) */
router.get("/", function (req, res, next) {
  res.render("layouts/aportaciones", { title: "Aportacion" });
});

/* POST home page. (aportaciones.ejs) */
router.post("/", upload.single("imagen"), function (req, res, next) {
  try {
    // Establecemos la fecha para la imagen
    var nuevaFecha = fecha();
    const data = req.body;
    // Obtener datos de la imagen a través de la función 'imagen'
    const img = uploadImagen(req);
    if (img && img[0] && img[1]) {
      var metadata = img[1];
      var imagenBuffer = img[0];

      console.log("imagenBuffer:", imagenBuffer);
      console.log("data.descripcion:", data.descripcion);
      console.log("nuevaFecha:", nuevaFecha);
      console.log("JSON.stringify(metadata):", JSON.stringify(metadata));
      // Consulta SQL para insertar los datos
      db.query(
        "INSERT INTO aportaciones(imagen, descripcion, fecha, metadatos) VALUES (?,?,?,?)",
        [imagenBuffer, data.descripcion, nuevaFecha, JSON.stringify(metadata)]
      );

      console.log("Subido con éxito");
      res.redirect("/");
    } else {
      console.log("No se proporcionó ninguna imagen");
      res.status(400).send("No se proporcionó ninguna imagen");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error interno del servidor");
  }
});

module.exports = router;
