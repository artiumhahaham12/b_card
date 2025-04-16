const express = require('express');
const winston = require('winston');

const app = express();

// Настройка Winston
const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }), // Логирование в консоль
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }) // Логирование ошибок в файл
  ]
});

// Middleware для логирования всех ответов с кодами 400 и выше
app.use((req, res, next) => {
  const originalSend = res.send; // Сохраняем оригинальный метод send

  res.send = function (body) {
    if (res.statusCode >= 400) {
      logger.error(`Ошибка ${res.statusCode}: ${req.method} ${req.url} - ${body}`);
    }
    return originalSend.apply(res, arguments);
  };

  next();
});

// Пример маршрутов с разными статусами
app.get('/success', (req, res) => {
  res.status(200).send('OK');
});

app.get('/bad-request', (req, res) => {
  res.status(400).send('Некорректный запрос');
});

app.get('/unauthorized', (req, res) => {
  res.status(401).send('Неавторизовано');
});

app.get('/server-error', (req, res) => {
  res.status(500).send('Ошибка сервера');
});

app.use((err, res, ) => {
  logger.error(`Ошибка ${err.statusCode || 500}: ${err.message}`);
  res.status(err.statusCode || 500).json({ error: err.message || 'Внутренняя ошибка сервера' });
});

app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});
