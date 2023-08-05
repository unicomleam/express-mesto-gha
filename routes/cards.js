const cardsRouter = require('express').Router();
const {
  getAllCards, createCard, deleteCard, putLike, deleteLike,
} = require('../controllers/cards');
const {
  createCardValidation, deleteCardValidation, putLikeValidation, deleteLikeValidation,
} = require('../middlewares/validation');

cardsRouter.get('/', getAllCards);
cardsRouter.post('/', createCardValidation, createCard);
cardsRouter.delete('/:cardId', deleteCardValidation, deleteCard);
cardsRouter.put('/:cardId/likes', putLikeValidation, putLike);
cardsRouter.delete('/:cardId/likes', deleteLikeValidation, deleteLike);

module.exports = cardsRouter;
