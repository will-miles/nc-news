const usersRouter = require('express').Router();
const { getAllUsers, getUserByUsername } = require('../controllers/users');

usersRouter
  .route('/')
  .get(getAllUsers)
  .all((req, res, next) => next({ status: 405, msg: 'Method not allowed' }));

usersRouter
  .route('/:username')
  .get(getUserByUsername)
  .all((req, res, next) => next({ status: 405, msg: 'Method not allowed' }));

module.exports = { usersRouter };
