const connection = require('../db/connection');

const fetchUserByUsername = user => {
  return connection
    .select('*')
    .from('users')
    .where('username', user)
    .then(([outputUser]) => {
      if (!outputUser) {
        return Promise.reject({
          status: 404,
          msg: `No user found for username: ${user}`
        });
      }
      return outputUser;
    });
};

module.exports = { fetchUserByUsername };
