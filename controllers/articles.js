const { fetchArticleById } = require('../models/articles');

const getArticleById = (req, res, next) => {
  const id = req.params.article_id;
  fetchArticleById(id)
    .then(article => {
      res.status(200).send(article);
    })
    .catch(next);
};

module.exports = { getArticleById };
