const STATUS = {
  USER_NOT_FOUND: 'Пользователь по указанному _id не найден',
  CARD_NOT_FOUND: 'Карточка с указанным _id не найдена',
  NOT_FOUND: 'Запрашиваемый ресурс не найден',
  DEFAULT_ERROR: 'На сервере произошла ошибка',
  BAD_REQUEST: 'Передан неверный запрос',
  BAD_LIKE_REQ: 'Переданы некорректные данные для постановки/снятия лайка',
  INVALID_USER: 'Переданы некорректные данные при создании пользователя',
  INVALID_INFO_UPDATE: 'Переданы некорректные данные при обновлении профиля',
  INVALID_AVATAR_UPDATE: 'Переданы некорректные данные при обновлении аватара',
  INVALID_CARD_CREATE: 'Переданы некорректные данные при создании карточки',
  FORBIDDEN_CARD: 'У вас нет прав для удаления этой карточки',
  CONFLICT_EMAIL: 'Пользователь с данным email уже зарегистрирован',
  UNAUTHORIZED_USER: 'Необходима авторизация',
  UNAUTHORIZED_MAIL_PASSWORD: 'Неправильные почта или пароль',
};

module.exports = STATUS;
