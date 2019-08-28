const articlesRouter = require('express').Router();
const {
  getArticleById,
  patchArticleVotes,
  postComment,
  getCommentsForArticle
} = require('../controllers/articles');

articlesRouter
  .route('/:article_id')
  .get(getArticleById)
  .patch(patchArticleVotes);

articlesRouter
  .route('/:article_id/comments')
  .post(postComment)
  .get(getCommentsForArticle);

module.exports = { articlesRouter };
