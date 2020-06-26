const Sequelize = require('sequelize');

const sequelize = new Sequelize('sql12350862', 'sql12350862', 'mhXcUpM9N8', {
    dialect: 'mysql',
    host: 'sql12.freemysqlhosting.net'
});

module.exports = sequelize;
