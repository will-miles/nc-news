const connection = require('../db/connection');

const fetchArticleById = id => {
  return connection
    .select('articles.*')
    .from('articles')
    .where('articles.article_id', id)
    .count({ comments_count: 'comments.comment_id' })
    .leftJoin('comments', 'articles.article_id', 'comments.article_id')
    .groupBy('articles.article_id')
    .then(outputArticle => {
      const thingExistsCheck = outputArticle.length
        ? true
        : checkItemExists(id, 'article_id', 'articles');
      return Promise.all([outputArticle, thingExistsCheck]);
    })
    .then(([outputArticle, thingExists]) => {
      if (thingExists) return outputArticle;
      else
        return Promise.reject({
          status: 404,
          msg: `Not found`
        });
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
          msg: `Not found`
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
    .orderBy(sort_by || 'created_at', order || 'desc')
    .then(outputComments => {
      const thingExistsCheck = outputComments.length
        ? true
        : checkItemExists(id, 'article_id', 'articles');
      return Promise.all([outputComments, thingExistsCheck]);
    })
    .then(([outputComments, thingExists]) => {
      if (thingExists) return outputComments;
      else
        return Promise.reject({
          status: 404,
          msg: 'Not found'
        });
    });
};

const fetchAllArticles = ({ sort_by, order, author, topic }) => {
  return connection
    .select(
      'articles.author',
      'articles.title',
      'articles.article_id',
      'articles.topic',
      'articles.created_at',
      'articles.votes'
    )
    .from('articles')
    .modify(query => {
      if (author) query.where('articles.author', author);
      if (topic) query.where('articles.topic', topic);
    })
    .count({ comments_count: 'comments.comment_id' })
    .leftJoin('comments', 'articles.article_id', 'comments.article_id')
    .groupBy('articles.article_id')
    .orderBy(sort_by || 'created_at', order || 'desc')
    .then(outputArticles => {
      let thingExistsCheck = true;
      if (author) {
        thingExistsCheck = outputArticles.length
          ? true
          : checkItemExists(author, 'author', 'articles');
      } else if (topic) {
        thingExistsCheck = outputArticles.length
          ? true
          : checkItemExists(topic, 'topic', 'articles');
      }
      return Promise.all([outputArticles, thingExistsCheck]);
    })
    .then(([outputArticles, thingExists]) => {
      if (thingExists) return outputArticles;
      else
        return Promise.reject({
          status: 404,
          msg: 'Not found'
        });
    });
};

const checkItemExists = (id, itemVal, table) => {
  return connection
    .select('*')
    .from(table)
    .where(itemVal, id)
    .then(([itemsInTable]) => {
      if (itemsInTable) return true;
      else return false;
    });
};

module.exports = {
  fetchArticleById,
  updateArticleVotes,
  createComment,
  fetchArticleComments,
  fetchAllArticles
};
