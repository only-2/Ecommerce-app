// External imports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const stripe = require("stripe")("sk_test_51Gxt4GIY3uMkMao1hJpwAhdlXYfFiZZ7yz56i5NpxzpXEqqDYnegl8MVk0XzoYbmRbNNK4JjllqMiHVDtqg290uX00Xc1uwmAG");
const uuid = require("uuid/v4");


// Internal imports
const sequelize = require('./database');
const User = require('./models/user');
const Product = require('./models/product');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

// Middlewares
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/checkout", async (req, res) => {
  let error;
  let status;
  try {
    const { price, token } = req.body;
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    });
    const idempotencyKey = uuid();
    const charge = await stripe.charges.create(
      {
        amount: Math.round(price),
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchased the by Aman Shop`,
        shipping: {
          name: 'Jenny Rosen',
          address: {
            line1: '510 Townsend St',
            postal_code: '98140',
            city: 'San Francisco',
            state: 'CA',
            country: 'US',
          }
        }
      },
      {
        idempotencyKey
      }
    );
    console.log("Charge:", { charge });
    status = "success";
  } catch (error) {
    console.error("Error:", error);
    status = "failure";
  }

  res.json({ error, status });
});


// Will be moved in routes later
app.use('/addProduct', (req, res, next) => {
  let { title, imageUrl, Price, Desc, category } = req.body;
  // console.log(req.body)
  if (!imageUrl) imageUrl = "https://www.warnersstellian.com/Content/images/product_image_not_available.png";
  Product.create({
    title: title,
    imageUrl: imageUrl,
    price: Price,
    category: category,
    description: Desc
  })
    .then(result => {
      // console.log(result);
    })
    .catch(err => {
      console.log(err);
    })
  res.status(201).send(title);
})

app.use('/getProfile', (req, res) => {
  const id = req.query.id;
  // console.log(id, typeof id);
  User.findByPk(id)
    .then(user => {
      res.send(user);
    })
    .catch(err => console.log(err));
});

app.use('/getOrders', (req, res) => {
  const id = req.query.id;
  // console.log(id, typeof id);
  User.findByPk(id)
    .then(user => {
      return user.getOrders({include: ['products']});
    })
    .then(orders => {
      // console.log(orders);
      res.send(orders);
    })
    .catch(err => console.log(err));
});


app.use('/getElectronics', (req, res) => {
  Product.findAll({ where: { category: 'electronics' } })
    .then(product => {
      res.send(product);
    })
    .catch(err => console.log(err));
});
app.use('/getBooks', (req, res) => {
  Product.findAll({ where: { category: 'books' } })
    .then(product => {
      res.send(product);
    })
    .catch(err => console.log(err));
});
app.use('/getKids', (req, res) => {
  Product.findAll({ where: { category: 'kids' } })
    .then(product => {
      res.send(product);
    })
    .catch(err => console.log(err));
});
app.use('/getApparels', (req, res) => {
  Product.findAll({ where: { category: 'Apparels' } })
    .then(product => {
      res.send(product);
    })
    .catch(err => console.log(err));
});
app.use('/getHomeandfurniture', (req, res) => {
  Product.findAll({ where: { category: 'homeandfurniture' } })
    .then(product => {
      res.send(product);
    })
    .catch(err => console.log(err));
});
app.use('/getFootwear', (req, res) => {
  Product.findAll({ where: { category: 'footwear' } })
    .then(product => {
      res.send(product);
    })
    .catch(err => console.log(err));
});

app.use('/place-order', (req, res) => {
  const { userId } = req.body;
  let fetchedCart;
  let currentUser;
  User.findByPk(userId)
    .then(user => {
      currentUser = user;
      return user.getCart()
    })
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then(products => {
      return currentUser
        .createOrder()
        .then(order => {
          return order.addProducts(
            products.map(product => {
              product.orderItem = { quantity: product.cartItem.quantity };
              return product;
            })
          );
        })
        .catch(err => console.log(err));
    })
    .then(result => {
      return fetchedCart.setProducts(null);
    })
    .then(result => {
      res.redirect('/orders');
    })
    .catch(err => console.log(err));
});


app.use('/getCartProducts', (req, res) => {
  const id = req.query.id;
  // console.log(id, typeof id);
  User.findByPk(id)
    .then(user => {
      return user.getCart()
    })
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

app.use('/deleteProd', (req, res) => {
  const { userId, prodId } = req.body;
  Product.findByPk(prodId)
    .then(product => {
      return product.destroy();
    })
    .then(result => {
      res.status(201).send({ result: result, status: "success" });
    })
    .catch(err => console.log(err));
});


app.use('/deleteFromCart', (req, res) => {
  const { prodId, userId } = req.body;
  User.findByPk(userId)
    .then(user => {
      return user.getCart()
    })
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
  const { prodId, userId } = req.body;
  let fetchedCart;
  let newQuantity = 1;
  User.findByPk(userId)
    .then(user => {
      return user.getCart()
    })
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
  console.log(firstName, password);
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
        address: address,
        DOB: dob
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
  let userLoggedIn;
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
      res.status(200).json({
        token: 'token',
        userId: userLoggedIn.id,
        isAdmin: userLoggedIn.isAdmin,
        name: userLoggedIn.firstName
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
});

app.use('/deleteUser', (req, res) => {
  const { userId } = req.body;
  User.findByPk(userId)
    .then(user => {
      const result = user.destroy();
      res.status(201).send(result);
    })
    .catch(err => console.log(err));
});

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

sequelize
  .sync({ force: true })
  // .sync()
  .then(result => {
    return User.findByPk(1);
  })
  .then(user => {
    if (!user) {
      // Admin user with password 12345 added
      return User.create({
        firstName: 'Admin',
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