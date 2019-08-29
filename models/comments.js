const connection = require('../db/connection');

const updateCommentVotes = (id, voteInc = 0) => {
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
          msg: `Not found`
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
          msg: `Not found`
        });
      }
      return [outputComment];
    });
};

module.exports = { updateCommentVotes, removeComment };
