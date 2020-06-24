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
    contact: Sequelize.BIGINT,
    address: Sequelize.STRING,
    isAdmin: Sequelize.BOOLEAN,
    DOB: Sequelize.DATEONLY
});

module.exports = User;