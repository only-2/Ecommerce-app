const Sequelize = require('sequelize');

const sequelize = new Sequelize('shopping_app1', 'root', 'naveen19991124', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;
