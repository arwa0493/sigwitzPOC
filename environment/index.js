// returns the configuration based on environment
const env = process.env.NODE_ENV || 'development';
module.exports = require(`./${env}.env.js`);
