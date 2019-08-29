const express = require('express');
const app = express();
const apiRouter = require('./routes/api-router');
const {
  handle400Errors,
  handleServerErrors,
  handleCustomErrors,
  handle404Errors
} = require('./errors/index');

app.use(express.json());

app.use('/api', apiRouter);

app.use('/*', (req, res, next) =>
  res.status(404).send({ msg: 'Route not found' })
);

app.use(handleCustomErrors);
app.use(handle400Errors);
app.use(handle404Errors);
app.use(handleServerErrors);

module.exports = app;
