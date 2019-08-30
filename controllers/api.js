const endpoints = require('../endpoints.json');

const getEndpointJson = (req, res, next) => {
  res.status(200).send({ endpoints });
};

module.exports = { getEndpointJson };
