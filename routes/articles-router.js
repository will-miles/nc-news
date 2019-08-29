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
  .patch(patchArticleVotes);

articlesRouter
  .route('/:article_id/comments')
  .post(postComment)
  .get(getCommentsForArticle);

module.exports = { articlesRouter };
