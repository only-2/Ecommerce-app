const Sequelize = require('sequelize');

const sequelize = require('../database');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING
});

module.exports = User;