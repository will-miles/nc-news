const articlesRouter = require('express').Router();
const {
  getArticleById,
  patchArticleVotes,
  postComment,
  getCommentsForArticle,
  getAllArticles
} = require('../controllers/articles');

articlesRouter.route('/').get(getAllArticles);

articlesRouter
  .route('/:article_id')
  .get(getArticleById)
  .patch(patchArticleVotes)
  .all((req, res, next) => next({ status: 405, msg: 'Method not allowed' }));

articlesRouter
  .route('/:article_id/comments')
  .post(postComment)
  .get(getCommentsForArticle)
  .all((req, res, next) => next({ status: 405, msg: 'Method not allowed' }));

module.exports = { articlesRouter };
