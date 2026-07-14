const Card = require("../models/card");

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.json({ data: cards }))
    .catch((err) => res.status(500).json({ message: err.message }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  console.log(req.user._id);

  Card.create({ name, link, owner })
    .then((card) => res.status(201).json({ data: card }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).json({ message: "Datos de tarjeta inválidos" });
      } else {
        res.status(500).json({ message: err.message });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .orFail(() => {
      const error = new Error("Tarjeta no encontrada");
      error.statusCode = 404;
      throw error;
    })
    .then((card) => {
      res.json({ message: "Tarjeta eliminada correctamente" });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).json({ message: "ID de tarjeta inválido" });
      } else if (err.statusCode === 404) {
        res.status(404).json({ message: err.message });
      } else {
        res.status(500).json({ message: err.message });
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error("Tarjeta no encontrada");
      error.statusCode = 404;
      throw error;
    })
    .then((card) => {
      res.json({ data: card });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).json({ message: "ID de tarjeta inválido" });
      } else if (err.statusCode === 404) {
        res.status(404).json({ message: err.message });
      } else {
        res.status(500).json({ message: err.message });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error("Tarjeta no encontrada");
      error.statusCode = 404;
      throw error;
    })
    .then((card) => {
      res.json({ data: card });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).json({ message: "ID de tarjeta inválido" });
      } else if (err.statusCode === 404) {
        res.status(404).json({ message: err.message });
      } else {
        res.status(500).json({ message: err.message });
      }
    });
};
