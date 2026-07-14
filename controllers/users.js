const User = require("../models/user");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.json({ data: users }))
    .catch((err) => res.status(500).json({ message: err.message }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      const error = new Error("Usuario no encontrado");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => {
      res.json({ data: user });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).json({ message: "ID de usuario inválido" });
      } else if (err.statusCode === 404) {
        res.status(404).json({ message: err.message });
      } else {
        res.status(500).json({ message: err.message });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).json({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).json({ message: "Datos de usuario inválidos" });
      } else {
        res.status(500).json({ message: err.message });
      }
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      const error = new Error("Usuario no encontrado");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => {
      res.json({ data: user });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).json({ message: "ID de usuario inválido" });
      } else if (err.name === "ValidationError") {
        res.status(400).json({ message: "Datos de usuario inválidos" });
      } else if (err.statusCode === 404) {
        res.status(404).json({ message: err.message });
      } else {
        res.status(500).json({ message: err.message });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      const error = new Error("Usuario no encontrado");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => {
      res.json({ data: user });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).json({ message: "ID de usuario inválido" });
      } else if (err.name === "ValidationError") {
        res.status(400).json({ message: "Datos de usuario inválidos" });
      } else if (err.statusCode === 404) {
        res.status(404).json({ message: err.message });
      } else {
        res.status(500).json({ message: err.message });
      }
    });
};
