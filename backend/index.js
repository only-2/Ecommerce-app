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

app.use('/addProduct', (req, res, next) => {
  const { title, imageUrl, Price, Desc } = req.body;
  console.log(req.body)
  Product.create({
    title: title,
    imageUrl: imageUrl,
    price: Price,
    description: Desc
  })
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    })
  res.status(201).send(title);
})

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

sequelize
  // .sync({ force: true })
  .sync()
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