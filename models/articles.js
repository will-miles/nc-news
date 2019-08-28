const connection = require('../db/connection');

const fetchArticleById = id => {
  return connection
    .select('articles.*')
    .from('articles')
    .where('articles.article_id', id)
    .count({ comments_count: 'comments.comment_id' })
    .leftJoin('comments', 'articles.article_id', 'comments.article_id')
    .groupBy('articles.article_id')
    .then(([outputArticle]) => {
      if (!outputArticle) {
        return Promise.reject({
          status: 404,
          msg: `No article found for article_id: ${id}`
        });
      }
      return outputArticle;
    });
};

const updateArticleVotes = (id, voteInc) => {
  return connection
    .select('*')
    .from('articles')
    .where('article_id', id)
    .increment('votes', voteInc)
    .returning('*')
    .then(([outputArticle]) => {
      if (!outputArticle) {
        return Promise.reject({
          status: 404,
          msg: `No article found for article_id: ${id}`
        });
      }
      return [outputArticle];
    });
};

const createComment = (id, username, text) => {
  const newCommentObj = { author: username, article_id: id, body: text };
  return connection('comments')
    .insert(newCommentObj)
    .returning('*');
};

const fetchArticleComments = (id, { sort_by, order }) => {
  return connection
    .select('comment_id', 'votes', 'created_at', 'author', 'body')
    .from('comments')
    .where('article_id', id)
    .orderBy(sort_by || 'created_at', order || 'desc');
};

module.exports = {
  fetchArticleById,
  updateArticleVotes,
  createComment,
  fetchArticleComments
};
