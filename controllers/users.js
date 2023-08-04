const User = require('../models/user');
const { BAD_REQUEST_ERROR, NOT_FOUND_ERROR, SERVER_ERROR } = require('../utils/server-err');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(SERVER_ERROR).send({ message: err.name }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) res.status(NOT_FOUND_ERROR).send({ message: 'Запрашиваемый пользователь не найден' });
      else res.send(user);
    })
    .catch((err) => res.status(BAD_REQUEST_ERROR).send({ message: err.name }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => res.status(BAD_REQUEST_ERROR).send({ message: err.name }));
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) res.status(NOT_FOUND_ERROR).send({ message: 'Запрашиваемый пользователь не найден' });
      else res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_ERROR).send({ message: 'Переданы невалидные данные' });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => {
      if (!user) res.status(BAD_REQUEST_ERROR).send({ message: 'Запрашиваемый пользователь не найден' });
      else res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_ERROR).send({ message: 'Переданы невалидные данные' });
      }
    });
};
