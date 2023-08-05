const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const { signup, signin } = require('./middlewares/validation');
const auth = require('./middlewares/auth');

const ServerError = require('./errors/ServerError');
const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {});

app.use(helmet());
app.use(bodyParser.json());

app.post('/signin', signin, login);
app.post('/signup', signup, createUser);
app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('*', (req, res, next) => {
  next(new NotFoundError('Ресурс не найден'));
});

app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = ServerError } = err;
  res.status(statusCode).send({ message: statusCode === ServerError ? 'Стандартная ошибка' : err.message });
  next();
});

app.listen(PORT);
