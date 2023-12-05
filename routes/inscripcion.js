var express = require("express");
var router = express.Router();
var db = require("../conexion/conexion");

/* GET home page.(inscripcion.ejs) */
router.get("/", function (req, res) {
  db.query("SELECT * FROM usuarios", function (err, resultados) {
    console.log(resultados);
  });
  res.render("layouts/inscripcion", { title: "Inscripcion" });
});

/* POST home page.(inscripcion.ejs) */
router.post("/", function (req, res) {
  try {
    var data = req.body;
    const email = data.email;
    const queryString =
      "SELECT COUNT(*) AS existeDato FROM usuarios WHERE email = ?";

    db.query(queryString, [email], function (error, results, fields) {
      if (error) {
        console.log(error);
        return res.status(500).send("Error interno del servidor");
      }

      const existeDato = results[0].existeDato > 0;

      if (existeDato) {
        console.log("Ya está registrado");
        res.redirect("/");
      } else {
        db.query(
          "INSERT INTO usuarios (nombre, apellido, email, admin) VALUES (?,?,?,?)",
          [data.nombre, data.apellido, data.email, 0]
        );

        console.log("Nuevo usuario registrado");
        res.redirect("/");
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error interno del servidor");
  }
});

module.exports = router;
