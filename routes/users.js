const usersRouter = require('express').Router();
const {
  getUsers, getUserById, updateUser, updateAvatar, getCurrentUser,
} = require('../controllers/users');
const { getUserByIdValidation, updateUserValidation, updateAvatarValidation } = require('../middlewares/validation');

usersRouter.get('/', getUsers);
usersRouter.get('/:userId', getUserByIdValidation, getUserById);
usersRouter.get('/me', getCurrentUser);
usersRouter.patch('/me', updateUserValidation, updateUser);
usersRouter.patch('/me/avatar', updateAvatarValidation, updateAvatar);

module.exports = usersRouter;
