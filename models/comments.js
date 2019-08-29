const connection = require('../db/connection');

const updateCommentVotes = (id, voteInc) => {
  return connection
    .select('*')
    .from('comments')
    .where('comment_id', id)
    .increment('votes', voteInc)
    .returning('*')
    .then(([outputComment]) => {
      if (!outputComment) {
        return Promise.reject({
          status: 404,
          msg: `No comment found for comment_id: ${id}`
        });
      }
      return [outputComment];
    });
};

const removeComment = id => {
  return connection
    .del('*')
    .from('comments')
    .where('comment_id', id)
    .returning('*')
    .then(([outputComment]) => {
      if (!outputComment) {
        return Promise.reject({
          status: 404,
          msg: `No comment found for comment_id: ${id}`
        });
      }
      return [outputComment];
    });
};

module.exports = { updateCommentVotes, removeComment };
