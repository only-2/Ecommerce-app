import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

import Home from "./pages/Home/Home";
import AddProduct from "./pages/admin/Admin";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import Products from './pages/Products/Products';
import Cart from './pages/Cart/Cart';
import Category from "./pages/Category/Category";
import Profile from "./pages/Profile/Profile";
import ProductView from "./pages/ProductView/ProductView";
import Orders from "./pages/Orders/Orders";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuth: true,
            token: null,
            userinfo: {
                name: '',
                userId: null,
                isAdmin: false,
            },
            products: [],
            slider: '',
            product: null
        };
    }

    /* 
        componentDidMount
        logoutHandler
        loginHandler
        signupHandler
        setAutoLogout 
        Routes 
            - Without Login
            - With Login
    */

    componentDidMount() {
        this.setState({
            isAuth: true,
            userinfo: {
                name: "Aman Raj",
                userId: "Static Data",
                isAdmin: true,
            },
        });
    }
    logoutHandler = () => {
        this.setState({
            isAuth: true,
            userinfo: {
                name: "Aman Raj",
                userId: "Static Data",
                isAdmin: true,
            },
        });
    };
    signupHandler = (event, authData) => {
        event.preventDefault();
        fetch('http://localhost:4000/auth/signup', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: authData.email,
                password: authData.password,
                firstName: authData.firstName,
                lastName: authData.lastName,
                contact: authData.contact,
                dob: authData.dob,
                address: authData.address
            })
        })
            .then(res => {
                if (res.status === 422) {
                    throw new Error(
                        "Validation failed. Make sure the email address isn't used yet!"
                    );
                }
                if (res.status !== 200 && res.status !== 201) {
                    console.log('Error!');
                    throw new Error('Creating a user failed!');
                }
                return res.json();
            })
            .then(resData => {
                console.log(resData);
                this.setState({ isAuth: false, userId: resData.userId });
                this.props.history.replace('/');
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    isAuth: false,
                });
            });
    };
    setAutoLogout = milliseconds => {
        setTimeout(() => {
            this.logoutHandler();
        }, milliseconds);
    };
    updateProducts = prod => {
        this.setState({ products: prod });
    }
    updateSingleProduct = prod => {
        this.setState({ product: prod });
    }
    updateSliderPos = pos => {
        this.setState({ slider: pos });
    }

    render() {
        // If not Logged in
        let routes = (
            <Switch>
                <Route
                    path="/"
                    exact
                    render={props => (
                        <Login
                            {...props}
                            onLogin={this.loginHandler}
                        />
                    )}
                />
                <Route
                    path="/signup"
                    exact
                    render={props => (
                        <Signup
                            {...props}
                            onSignup={this.signupHandler}
                        />
                    )}
                />
                <Redirect to="/" />
            </Switch>
        );
        // If Authenticated
        if (this.state.isAuth) {
            routes = (
                <Switch>
                    <Route
                        path="/"
                        exact
                        render={props => (
                            <Home
                                logout={this.logoutHandler}
                                userinfo={this.state.userinfo}
                            />
                        )}
                    />
                    <Route
                        path="/admin"
                        exact
                        render={props => (
                            <AddProduct
                                userinfo={this.state.userinfo}
                                logout={this.logoutHandler}
                            />
                        )}
                    />
                    <Route
                        path="/viewcart"
                        exact
                        render={props => (
                            <Cart
                                logout={this.logoutHandler}
                                userinfo={this.state.userinfo}
                            />
                        )}
                    />
                    <Route
                        path="/category"
                        exact
                        render={props => (
                            <Category
                                logout={this.logoutHandler}
                                userinfo={this.state.userinfo}
                                updateProd={this.updateProducts}
                                updateSliderPos={this.updateSliderPos}
                            />
                        )}
                    />
                    <Route
                        path="/products"
                        exact
                        render={props => (
                            <Products
                                logout={this.logoutHandler}
                                products={this.state.products}
                                userinfo={this.state.userinfo}
                                slider={this.state.slider}
                                updateSingleProduct={this.updateSingleProduct}
                            />
                        )}
                    />
                    <Route
                        path="/product-view"
                        exact
                        render={props => (
                            <ProductView
                                logout={this.logoutHandler}
                                product={this.state.product}
                                userinfo={this.state.userinfo}
                            />
                        )}
                    />
                    <Route
                        path="/Profile"
                        exact
                        render={props => (
                            <Profile
                                userinfo={this.state.userinfo}
                                logout={this.logoutHandler}
                            />
                        )}
                    />
                    <Route
                        path="/orders"
                        exact
                        render={props => (
                            <Orders
                                userinfo={this.state.userinfo}
                                logout={this.logoutHandler}
                            />
                        )}
                    />
                </Switch>
            )
        }
        return (
            <Switch>
                {routes}
            </Switch>
        );
    }
}

export default withRouter(App);