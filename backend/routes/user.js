const router = require('express').Router();
const {
  userByIdValidation,
  userInfoValidation,
  avatarValidation,
} = require('../middlewares/validation/userValidator');
const {
  getUsers,
  getUserById,
  getUserInfo,
  updateUserInfo,
  updateAvatar,
  logout,
} = require('../controllers/user');

router.get('/', getUsers);
router.get('/me', getUserInfo);
router.get('/:id', userByIdValidation, getUserById);
router.patch('/me', userInfoValidation, updateUserInfo);
router.patch('/me/avatar', avatarValidation, updateAvatar);
router.delete('/', logout);

module.exports = router;
