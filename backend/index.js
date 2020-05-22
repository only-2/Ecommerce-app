// External imports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Internal imports
const sequelize = require('./database');
const User = require('./models/user');
const Product = require('./models/product');

// Middlewares
const app = express();
app.use(bodyParser.json());
app.use(cors());


Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
sequelize
    .sync({ force: true })
    .then(result => {
        return User.findByPk(1);
    })
    .then(user => {
        if (!user) {
            return User.create({ name: 'admin', email: 'test@test.com' });
        }
        return user;
    })
    .then(user => {
        app.listen(process.env.PORT || 4000, () => {
            console.log("Server starting on port 4000")
        });
    })
    .catch(err => {
        console.log(err);
    });