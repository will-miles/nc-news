const usersRouter = require('express').Router();
const { getUserByUsername } = require('../controllers/users');

usersRouter
  .route('/:username')
  .get(getUserByUsername)
  .all((req, res, next) => next({ status: 405, msg: 'Method not allowed' }));

module.exports = { usersRouter };
