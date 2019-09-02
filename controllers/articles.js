const {
  fetchArticleById,
  updateArticleVotes,
  createComment,
  fetchArticleComments,
  fetchAllArticles
} = require('../models/articles');

const getArticleById = (req, res, next) => {
  const id = req.params.article_id;
  fetchArticleById(id)
    .then(([article]) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

const patchArticleVotes = (req, res, next) => {
  const id = req.params.article_id;
  const votes = req.body.inc_votes;
  updateArticleVotes(id, votes)
    .then(([article]) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

const postComment = (req, res, next) => {
  const id = req.params.article_id;
  const username = req.body.username;
  const text = req.body.body;
  createComment(id, username, text)
    .then(([comment]) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

const getCommentsForArticle = (req, res, next) => {
  const id = req.params.article_id;
  const query = req.query;
  fetchArticleComments(id, query)
    .then(comments => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

const getAllArticles = (req, res, next) => {
  const query = req.query;
  fetchAllArticles(query)
    .then(articles => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

module.exports = {
  getArticleById,
  patchArticleVotes,
  postComment,
  getCommentsForArticle,
  getAllArticles
};
