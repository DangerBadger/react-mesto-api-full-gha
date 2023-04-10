const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate'); /* Если запрос не проходит валидацию, celebrate передаст его в этот мидлвэр */
const cookieParser = require('cookie-parser');
const limiter = require('./utils/limiter');
const { MESTO_DB_CONNECT, PORT } = require('./config');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

// Подключение express
const app = express();

// Коннект БД по значению переменной окружения
mongoose.connect(MESTO_DB_CONNECT);

app.use(limiter);

// Автоматическая простановка заголовков безопасности
app.use(helmet());

app.use(express.json()); /* Более актуальный способ парсинга */
app.use(express.urlencoded({ extended: true }));

// Парсинг кук
app.use(cookieParser());

// Логгер запросов
app.use(requestLogger);

// Обработка кросс-доменных запросов
app.use(cors);

// Направление по всем рутам
app.use(routes);

// Логгер ошибок
app.use(errorLogger);

// Обработчик ошибок celebrate
app.use(errors());

// Централизованный обработчик ошибок
app.use(errorHandler);

// Сигнал о прослушке порта
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
