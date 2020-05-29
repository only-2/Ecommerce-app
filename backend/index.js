// External imports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
// const { randomBytes } = require('crypto');
// const jwt = require('jsonwebtoken');


// Internal imports
const sequelize = require('./database');
const User = require('./models/user');
const Product = require('./models/product');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');

// Middlewares
const app = express();
app.use(bodyParser.json());
app.use(cors());

// app.use((req, res, next) => {
//   if (!req.user) {
//     return next();
//   }
//   User.findByPk(req.user.dataValues.id)
//     .then(user => {
//       req.user = user;
//       next();
//     })
//     .catch(err => console.log(err));
// });

let userLoggedIn;

// Will be moved in routes
app.use('/addProduct', (req, res, next) => {
  const { title, imageUrl, Price, Desc, category } = req.body;
  console.log(req.body)
  Product.create({
    title: title,
    imageUrl: imageUrl,
    price: Price,
    category: 'Electronics',
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


app.use('/getElectronics', (req, res) => {
  Product.findAll({ where: { category: 'electronics' } })
    .then(product => {
      res.send(product);
    })
    .catch(err => console.log(err));
});

app.use('/getCartProducts', (req, res) => {
  userLoggedIn
    .getCart()
    .then(cart => {
      return cart
        .getProducts()
        .then(products => {
          res.send(products)
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});


app.use('/deleteFromCart', (req, res) => {
  const { prodId } = req.body;
  userLoggedIn
    .getCart()
    .then(cart => {
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then(result => {
      res.status(201).send(result);
    })
    .catch(err => console.log(err));
});

app.use('/addtoCart', (req, res) => {
  const { prodId } = req.body;
  let fetchedCart;
  let newQuantity = 1;
  userLoggedIn
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }
      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodId);
    })
    .then(product => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity }
      });
    })
    .then(() => {
      res.status(201).send("Updated");
    })
    .catch(err => console.log(err));
});


app.use('/auth/signup', (req, res, next) => {
  const { email, firstName, lastName, password, contact, dob, address } = req.body;
  console.log(firstName,password);
  bcrypt
    .hash(password, 12)
    .then(hashedPw => {
      User.create({
        email: email,
        password: hashedPw,
        isAdmin: false,
        firstName: firstName,
        lastName: lastName,
        contact: contact,
        address: address
      })
        .then(result => {
          // console.log(result)
          result.createCart();
          res.status(201).json({ message: 'User created!', userId: result.id });
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
  User.findOne({ where: { email: email } })
    .then(user => {
      if (!user) {
        const error = new Error('A user with this email could not be found.');
        error.statusCode = 401;
        throw error;
      }
      userLoggedIn = user;
      // console.log(user);
      // console.log("Hahahahah Pass", password, user.password, email)
      return bcrypt.compare(password, user.password)
    })
    .then(isEqual => {
      if (!isEqual) {
        const error = new Error('Wrong password!');
        error.statusCode = 401;
        throw error;
      }
      res.status(200).json({ token: 'token', userId: userLoggedIn.id, isAdmin: userLoggedIn.isAdmin });
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
User.hasOne(Cart);
Cart.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

sequelize
  .sync({ force: true })
  // .sync()
  .then(result => {
    return User.findByPk(1);
  })
  .then(user => {
    if (!user) {
      // User with password 12345 added
      return User.create({
        firstName: 'admin',
        email: 'test@test.com',
        isAdmin: true,
        password: '$2a$12$8p/Q0bCjSCadQ/wPzUJ.VeiBRfQYcRYz1D4BMH42Ys.Tz7QJcrp8S'
      })
    }
    return user;
  })
  .then((user) => {
    user.createCart();
  })
  .then(cart => {
    app.listen(process.env.PORT || 4000, () => {
      console.log("Server starting on port 4000")
    });
  })
  .catch(err => {
    console.log(err);
  });