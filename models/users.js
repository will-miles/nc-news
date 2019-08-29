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
          msg: `Not found`
        });
      }
      return outputUser;
    });
};

module.exports = { fetchUserByUsername };
