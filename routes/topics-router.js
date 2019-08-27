const topicsRouter = require('express').Router();
const { getAllTopics } = require('../controllers/topics');

topicsRouter.route('/').get(getAllTopics);

module.exports = { topicsRouter };
