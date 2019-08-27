const connection = require('../db/connection');

const fetchAllTopics = () => {
  console.log('inside feetchAllTopics model...');
  return connection.select('*').from('topics');
};

module.exports = { fetchAllTopics };
