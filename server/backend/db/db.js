var config = require('../config'),
    mongojs = require('mongojs'),
    db = mongojs(config.db.connectionString, ['scores']);

module.exports = db;