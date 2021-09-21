const mysql = require('mysql');
const config = require('./botConfig');

const connection = mysql.createConnection({
    host     : config.dbHost,
    database : config.dbSchema,
    user     : config.dbUser,
    password : config.dbPassword,
    dateStrings: "true",
    multipleStatements: true,
    debug    : config.dev
});

module.exports = connection;