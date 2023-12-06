var express = require("express");
var router = express.Router();
var db = require("../public/conexion/conexion");
var jwt = require("jsonwebtoken");

/* GET home page.(login.ejs) */
router.get("/", function (req, res, next) {
  res.render("layouts/login", { title: "Iniciar Sesión" });
});

router.post("/", function (req, res) {
  var user = {
    name: req.body.usuario,
    password: req.body.password,
  };
  db.query(
    "SELECT * FROM usuarios WHERE nombre = ? AND password = ? ",
    [user.name, user.password],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error al verificar usuario en la base de datos");
      } else {
        if (results.length > 0) {
          // El usuario existe, asigna un token
          jwt.sign({ user }, "secretkey", (err, token) => {
            res.redirect("/");
          });
        } else {
          // El usuario no existe
          console.log("Usuario no encontrado en la base de datos");
          res.status(401).send("Credenciales incorrectas");
        }
      }
    }
  );
});

module.exports = router;
