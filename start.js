// css modules
require('css-modules-require-hook/preset');

// es6 modules
require("@babel/register")({});

module.exports = require('./server');