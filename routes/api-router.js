const apiRouter = require('express').Router();
const { topicsRouter } = require('./topics-router');
const { usersRouter } = require('./users-router');
const { articlesRouter } = require('./articles-router');
const { commentsRouter } = require('./comments-router');
const { getEndpointJson } = require('../controllers/api');

apiRouter
  .route('/')
  .get(getEndpointJson)
  .all((req, res, next) => next({ status: 405, msg: 'Method not allowed' }));
apiRouter.use('/topics', topicsRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/articles', articlesRouter);
apiRouter.use('/comments', commentsRouter);
apiRouter.use('/*', (req, res, next) =>
  next({ status: 404, msg: 'Not found' })
);

module.exports = apiRouter;
