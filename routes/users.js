const fs = require("fs");
const path = require("path");
const router = require("express").Router();

router.get("/", (req, res) => {
  const filePath = path.join(__dirname, "../data/users.json");
  fs.readFile(filePath, { encoding: "utf-8" }, (err, data) => {
    if (err) {
      res.status(500).send({ error: "Ha ocurrido un error en el servidor" });
      return;
    }
    const file = JSON.parse(data);
    res.json(file);
  });
});

router.get("/:id", (req, res) => {
  const filePath = path.join(__dirname, "../data/users.json");
  fs.readFile(filePath, { encoding: "utf-8" }, (err, data) => {
    if (err) {
      res.status(500).send({ error: "Ha ocurrido un error en el servidor" });
      return;
    }
    const file = JSON.parse(data);
    const user = file.find((item) => item._id === req.params.id);
    if (!user) {
      res.status(404).send({ message: "ID de usuario no encontrado" });
    } else {
      res.json(user);
    }
  });
});

module.exports = router;
