const connection = require('../db/connection');

const fetchUserByUsername = user => {
  return connection
    .select('*')
    .from('users')
    .where('username', user);
};

module.exports = { fetchUserByUsername };
