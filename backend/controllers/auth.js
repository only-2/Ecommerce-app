const bcrypt = require('bcryptjs');
const User = require('../models/user');
// const { randomBytes } = require('crypto');

let userLoggedIn;

exports.Login = (req, res, next) => {
    // console.log("In login");
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    User.findOne({ where: { email: email } })
        .then(user => {
            if (!user) {
                const error = new Error('A user with this email could not be found.');
                error.statusCode = 401;
                throw error;
            }
            loadedUser = user;
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
            // const token = jwt.sign(
            //   {
            //     email: loadedUser.email,
            //     userId: loadedUser._id.toString()
            //   },
            //   'secret_key',
            //   { expiresIn: '1h' }
            // );
            userLoggedIn = loadedUser;
            res.status(200).json({ token: 'token', userId: loadedUser.id });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.Signup = (req, res, next) => {
    const { email, name, password } = req.body;
    // console.log(req.body);
    console.log(password);
    // const userID = randomBytes(4).toString('hex');
    bcrypt
        .hash(password, 12)
        .then(hashedPw => {
            User.create({
                // id: userID,
                email: email,
                password: hashedPw,
                name: name
            })
                .then(result => {
                    // console.log(result)
                    result.createCart();
                    res.status(201).json({ message: 'User created!', userId: userID });
                })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.userLoggedIn = userLoggedIn;