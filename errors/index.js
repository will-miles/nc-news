const handleCustomErrors = (err, req, res, next) => {
  if (err.status) res.status(err.status).send({ msg: err.msg });
  else next(err);
};

const handle400Errors = (err, req, res, next) => {
  const codes = ['22P02', '42703', '23502', '42P01'];
  if (codes.includes(err.code))
    return res.status(400).send({ msg: 'Bad request' });
  else next(err);
};

const handle404Errors = (err, req, res, next) => {
  const codes = ['23503'];
  if (codes.includes(err.code))
    return res.status(404).send({ msg: 'Not found' });
  else next(err);
};

const handleServerErrors = (err, req, res, next) => {
  console.log(err);
  return res.status(500).send(err);
};

module.exports = {
  handleCustomErrors,
  handle400Errors,
  handle404Errors,
  handleServerErrors
};
