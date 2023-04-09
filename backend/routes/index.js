const router = require('express').Router();
const userRoutes = require('./user');
const cardRoutes = require('./card');
const loginRoutes = require('./signin');
const signupRoutes = require('./signup');
const auth = require('../middlewares/auth');
const NotFound = require('../utils/errors/NotFound');
const STATUS = require('../utils/constants/status');

// Приватные пути
router.use('/users', auth, userRoutes);
router.use('/cards', auth, cardRoutes);

// Проверка востановления сервера после падения
router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// Публчиные пути
router.use('/signin', loginRoutes);
router.use('/signup', signupRoutes);

// Обработка любого несуществующего рута
router.use('*', (req, res, next) => next(new NotFound(STATUS.NOT_FOUND)));

module.exports = router;
