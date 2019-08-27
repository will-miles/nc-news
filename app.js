const express = require('express');
const app = express();
const apiRouter = require('./routes/api-router');
const { handle400errors } = require('./errors/index');

app.use('/api', apiRouter);

app.use('/*', (req, res, next) =>
  res.status(404).send({ msg: 'Route not found' })
);

module.exports = app;
