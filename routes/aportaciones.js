var express = require("express");
var router = express.Router();
var db = require("../conexion/conexion");
const multer = require("multer");
const ExifParser = require("exif-parser");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/* GET home page.(aportaciones.ejs) */
router.get("/", function (req, res, next) {
  res.render("layouts/aportaciones", { title: "Aportacion" });
});

/* POST home page.(aportaciones.ejs) */
router.post("/", upload.single("imagen"), function (req, res, next) {
  try {
    //establecemos la fecha para la imagen
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}/${month}/${day}`;
    //obtenemos los datos del form
    const data = req.body;

    if (req.file && req.file.buffer) {
      //buffer espacio temporal en memoria
      const buffer = req.file.buffer;
      //analiza los datos binarios en el buffer
      const parser = ExifParser.create(buffer);
      //extrae los metadatos de la imagen
      const metadata = parser.parse();

      console.log("Metadatos de la imagen:", metadata);
      //consulta SQL para insertar los datos
      db.query(
        "INSERT INTO aportaciones(imagen, descripcion, fecha, metadatos) VALUES (?,?,?,?)",
        [buffer, data.descripcion, formattedDate, JSON.stringify(metadata)]
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
