const { fetchUserByUsername } = require('../models/users');

const getUserByUsername = (req, res, next) => {
  const { username } = req.params;
  fetchUserByUsername(username)
    .then(user => {
      // if (!user) res.status(404).send('User not found');
      res.status(200).send(user);
    })
    .catch(next);
};

module.exports = { getUserByUsername };
