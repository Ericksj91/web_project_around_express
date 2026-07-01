const express = require('express');

const { PORT = 3000 } = process.env;
const app = express();
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('*splat', (req, res) => {
  res.status(404).send({ message: 'Recurso solicitado no encontrado' });
});

app.listen(PORT, () => {
  console.log(`App esta escuchando el puerto ${PORT}`);
});
