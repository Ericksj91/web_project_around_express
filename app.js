const express = require("express");
const mongoose = require("mongoose");

const { PORT = 3000 } = process.env;
const app = express();
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

mongoose
  .connect("mongodb://localhost:27017/aroundb")
  .then(() => {
    console.log("Conectado a la base de datos");
  })
  .catch((err) => {
    console.error("Error al conectar a la base de datos", err);
  });

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: "6a5578a2e8a511e00f1e09ef",
  };

  next();
});
app.use("/users", usersRouter);
app.use("/cards", cardsRouter);
app.use("*splat", (req, res) => {
  res.status(404).send({ message: "Recurso solicitado no encontrado" });
});

app.listen(PORT, () => {
  console.log(`App esta escuchando el puerto ${PORT}`);
});
