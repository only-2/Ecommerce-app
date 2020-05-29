const Sequelize = require('sequelize');

const sequelize = require('../database');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    contact: Sequelize.INTEGER,
    address: Sequelize.STRING,
    isAdmin: Sequelize.BOOLEAN
});

module.exports = User;