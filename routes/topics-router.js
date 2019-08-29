const topicsRouter = require('express').Router();
const { getAllTopics } = require('../controllers/topics');

topicsRouter
  .route('/')
  .get(getAllTopics)
  .all((req, res, next) => next({ status: 405, msg: 'Method not allowed' }));

module.exports = { topicsRouter };
