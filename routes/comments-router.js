const commentsRouter = require('express').Router();
const { patchCommentVotes, deleteComment } = require('../controllers/comments');

commentsRouter
  .route('/:comment_id')
  .patch(patchCommentVotes)
  .delete(deleteComment)
  .all((req, res, next) => next({ status: 405, msg: 'Method not allowed' }));

module.exports = { commentsRouter };
