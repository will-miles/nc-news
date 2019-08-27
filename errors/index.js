const handel400errors = (err, req, res, next) => {
  const codes = [];
  if (codes.includes(err.code))
    return res.status(404).send({ msg: 'Route not found' });
  else next(err);
};

module.exports = { handel400errors };
