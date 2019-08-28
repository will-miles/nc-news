const ENV = process.env.NODE_ENV || 'development';

const testData = require('./test-data');
const devData = require('./development-data');

const data = {
  test: testData,
  development: devData
};

console.log(ENV);

module.exports = data[ENV];
