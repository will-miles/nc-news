const commentsRouter = require('express').Router();
const { patchCommentVotes, deleteComment } = require('../controllers/comments');

commentsRouter
  .route('/:comment_id')
  .patch(patchCommentVotes)
  .delete(deleteComment);

module.exports = { commentsRouter };
