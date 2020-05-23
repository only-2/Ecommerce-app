// External imports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const { randomBytes } = require('crypto');
// const jwt = require('jsonwebtoken');


// Internal imports
const sequelize = require('./database');
const User = require('./models/user');
const Product = require('./models/product');

// Middlewares
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Will be moved in routes
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

app.use('/postProduct', (req,res)=> {
  
});

app.use('/auth/signup', (req, res, next) => {
  const { email, name, password } = req.body;
  console.log(req.body);
  const userID = randomBytes(4).toString('hex');
  bcrypt
    .hash(password, 12)
    .then(hashedPw => {
      User.create({
        id: userID,
        email: email,
        password: hashedPw,
        name: name
      })
        .then(result => {
          console.log(hashedPw)
          res.status(201).json({ message: 'User created!', userId: userID });
        })
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
});

app.use('/auth/login', (req, res, next) => {
  console.log("In login");
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        const error = new Error('A user with this email could not be found.');
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
      if (!isEqual) {
        const error = new Error('Wrong password!');
        error.statusCode = 401;
        throw error;
      }
      // const token = jwt.sign(
      //   {
      //     email: loadedUser.email,
      //     userId: loadedUser._id.toString()
      //   },
      //   'secret_key',
      //   { expiresIn: '1h' }
      // );
      res.status(200).json({ token: 'token', userId: loadedUser.id });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
});

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

sequelize
  .sync({ force: true })
  // .sync()
  .then(result => {
    return User.findByPk(1);
  })
  .then(user => {
    if (!user) {
      return User.create({ id: '1', name: 'admin', email: 'test@test.com', password: '$2a$12$8p/Q0bCjSCadQ/wPzUJ.VeiBRfQYcRYz1D4BMH42Ys.Tz7QJcrp8S' });
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