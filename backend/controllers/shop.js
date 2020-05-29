const Product = require('../models/product');
const userLoggedIn = require('./auth').userLoggedIn;

// Products

// addProduct
exports.addProduct = (req, res) => {
    const { title, imageUrl, Price, Desc, category } = req.body;
    console.log(req.body)
    Product.create({
        title: title,
        imageUrl: imageUrl,
        price: Price,
        category: category,
        description: Desc
    })
        .then(result => {
            console.log("Product Added");
            // console.log(result);
        })
        .catch(err => {
            console.log(err);
        })
    res.status(201).send(title);
};
// getElectronics
exports.getElectronics = (req, res) => {
    Product.findAll({ where: { category: 'Electronics' } })
        .then(product => {
            res.send(product);
        })
        .catch(err => console.log(err));
};


//   Cart Routes

// addtoCart
exports.addtoCart = (req, res) => {
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
};
// getCartProducts
exports.getCartProducts = (req, res) => {
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
};
// deleteFromCart
exports.deleteFromCart = (req, res) => {
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
};
