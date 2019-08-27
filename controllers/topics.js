const { fetchAllTopics } = require('../models/topics');

const getAllTopics = (req, res, next) => {
  console.log('inside get all topics');
  fetchAllTopics()
    .then(topics => {
      console.log(topics);
      res.status(200).send(topics);
    })
    .catch(next);
};

module.exports = { getAllTopics };
