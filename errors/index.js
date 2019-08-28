const handle400errors = (err, req, res, next) => {
  const codes = [];
  if (err.status) res.status(err.status).send({ msg: err.msg });
  if (codes.includes(err.code))
    return res.status(404).send({ msg: 'Route not found' });
  else next(err);
};

module.exports = { handle400errors };
