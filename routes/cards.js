const cardsRouter = require('express').Router();
const {
  getAllCards, createCard, deleteCard, putLike, deleteLike,
} = require('../controllers/cards');

cardsRouter.get('/', getAllCards);
cardsRouter.post('/', createCard);
cardsRouter.delete('/:cardId', deleteCard);
cardsRouter.put('/:cardId/likes', putLike);
cardsRouter.delete('/:cardId/likes', deleteLike);

module.exports = cardsRouter;
