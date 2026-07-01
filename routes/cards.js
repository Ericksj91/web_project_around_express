const fs = require("fs");
const path = require("path");
const router = require("express").Router();

router.get("/", (req, res) => {
  const filePath = path.join(__dirname, "../data/cards.json");
  fs.readFile(filePath, { encoding: "utf-8" }, (err, data) => {
    if (err) {
      res.status(500).send({ error: "Ha ocurrido un error en el servidor" });
      return;
    }
    const file = JSON.parse(data);
    res.json(file);
  });
});

module.exports = router;
