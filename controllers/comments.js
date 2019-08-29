const { updateCommentVotes } = require('../models/comments');

const patchCommentVotes = (req, res, next) => {
  const id = req.params.comment_id;
  const votes = req.body.inc_votes;
  updateCommentVotes(id, votes)
    .then(([comment]) => {
      res.status(200).send(comment);
    })
    .catch(next);
};

module.exports = { patchCommentVotes };
