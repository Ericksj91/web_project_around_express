const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /https?:\/\/(www\.)?[a-z0-9.-]+[\w._~:/?%#\[\]@!$&'()*+,;=]*/i.test(
          v,
        );
      },
      message: (props) => `${props.value} no es una URL válida!`,
    },
  },
});

module.exports = mongoose.model("user", userSchema);
