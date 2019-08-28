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

module.exports = { fetchArticleById, updateArticleVotes };
