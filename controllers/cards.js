const Card = require('../models/card');
const { BAD_REQUEST_ERROR, NOT_FOUND_ERROR, SERVER_ERROR } = require('../utils/server-err');

module.exports.getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => { res.send(cards); })
    .catch(() => res.status(SERVER_ERROR).send({ message: 'Произошла ошибка' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_ERROR).send({ message: 'Переданы невалидные данные' });
      } else res.status(SERVER_ERROR).send({ message: 'Произошла ошибка' });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) res.status(NOT_FOUND_ERROR).send({ message: 'Переданы некорректные данные при удалении карточки' });
      else {
        Card.deleteOne(card)
          .then(() => res.send(card))
          .catch(() => res.status(SERVER_ERROR).send({ message: 'Произошла ошибка' }));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') res.status(BAD_REQUEST_ERROR).send({ message: 'Карточка c указанным _id не найдена' });
      else res.status(SERVER_ERROR).send({ message: 'Произошла ошибка' });
    });
};

module.exports.putLike = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) res.status(NOT_FOUND_ERROR).send({ message: 'Карточка c указанным id не найдена' });
      else res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST_ERROR).send({ message: 'Переданы некорректные данные для постановки лайка' });
      } else res.status(SERVER_ERROR).send({ message: 'Произошла ошибка' });
    });
};

module.exports.deleteLike = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) res.status(NOT_FOUND_ERROR).send({ message: 'Карточка c указанным id не найдена' });
      else res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST_ERROR).send({ message: 'Переданы некорректные данные для постановки лайка' });
      } else res.status(SERVER_ERROR).send({ message: 'Произошла ошибка' });
    });
};
