import React, { Component } from 'react';
import axios from 'axios';
import StripeCheckout from "react-stripe-checkout";
import { withRouter } from 'react-router-dom';

import Header from '../../components/Header/Header';
import './Cart.css';

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            price: 0,
            cartItems: []
        }
    }

    getCartItems = async () => {
        const data = [{
            title: "DELL XPS 15",
            imageUrl: "https://www.lifewire.com/thmb/eHrBCZqTCXeoCl7cSkBngIzaZAo=/1500x1500/filters:fill(auto,1)/_hero_SQ_Dell-XPS-13-Two-in-One-Computer-1-c8f6c090145a4de69ca1c90f75659abe.jpg",
            price: 149000,
            description: "Dell’s smallest 39.62cm (15.6) performance laptop with a stunning OLED display option. Now featuring 9th Gen Intel® Core™ processors.",
            category: 'electronics',
            quantity: '2'
        }, {
            title: "Now You See Her  (English, Paperback, Perks Heidi)",
            imageUrl: "https://rukminim1.flixcart.com/image/416/416/k1jlyfk0/book/7/8/2/now-you-see-her-original-imafk6a8wsjzt6cy.jpeg?q=70",
            price: 399,
            description: "She was your responsibility. And now she's missing.`I flew through this book in three days, with my heart in my mouth' Lisa Jewell`Believe us when we say this novel is the real deal' Heat `A gripping tale of friendship and deceit, where nothing is what it seems....",
            category: 'books',
            quantity: '1'
        }, {
            title: "iPhone 11",
            imageUrl: "https://rukminim1.flixcart.com/image/416/416/k2jbyq80pkrrdj/mobile-refurbished/x/j/s/iphone-11-128-d-mwm02hn-a-apple-0-original-imafkg242ugz8hwc.jpeg?q=70",
            price: 73990,
            description: "Featuring a 15.49-cm (6.1) all-screen Liquid Retina LCD and a glass and aluminum design, the iPhone 11 is as beautiful as it gets. Also, the IP68 rating ensures that is water-resistant up to 2 meters for 30 minutes.",
            category: 'electronics',
            quantity: '1'
        },]
        this.setState({ cartItems: data });
        console.log(this.state)
    }

    componentWillMount() {
        this.getCartItems();
    }

    remove = async (event, prodId) => {
        event.preventDefault();
        await axios.post('http://localhost:4000/deleteFromCart', {
            "prodId": prodId,
            "userId": this.props.userinfo.userId
        });
        console.log("Removed item", prodId);
        this.getCartItems();
    }

    async handleToken(token, price) {
        // const price = this.state.price;
        console.log(token, price)
        const res = await axios.post(
            "http://localhost:4000/checkout",
            { token, price }
        );
        console.log(res.data.status);
        if (res.data.status === "success") {
            toast("Success! Check email for details", { type: "success" });
            this.props.history.push('/');
            await axios.post('http://localhost:4000/place-order', {
                "userId": this.props.userinfo.userId
            });
            console.log("Idhar aa gaya")
        } else {
            toast("Something went wrong, Try again Later", { type: "error" });
        }
    }

    IncrementItem = async (event, prodId) => {
        event.preventDefault();
        const userId = this.props.userinfo.userId;
        // console.log(this.props.userinfo.userId, prodId);
        await axios.post('http://localhost:4000/addtoCart', {
            "userId": userId,
            "prodId": prodId
        })
        this.getCartItems();
    }

    render() {
        let sum = 0;

        let itemList = this.state.cartItems.map(item => {
            return (
                <div className="product" key={item.id}>
                    <div className="product-image cover">
                        <img src={item.imageUrl} alt={item.title} />
                    </div>
                    <div className="product-details">
                        <div className="product-title"><strong>{item.title}</strong></div><br></br><br></br>
                        <p className="product-description">{item.description}</p>
                    </div>
                    <div className="product-price">{item.price}</div>
                    <div className="product-quantity">
                        <input className="inputne" type="number" value={item.quantity} onChange={this.handleChange} />
                        <button className="pbtn" onClick={(e) => this.IncrementItem(e, item.productId)}> + </button>
                    </div>
                    <div className="product-removal">
                        <button className="remove-product" onClick={(e) => this.remove(e, item.productId)}>
                            Remove
                    </button>
                    </div>
                    <div style={{ display: 'none' }}>{sum += item.price * item.quantity}</div>
                    <div className="product-line-price">{item.price * item.quantity}</div>
                </div>
            )
        })

        return (
            <div className="cart-overall">
                <Header logout={this.props.logout} userinfo={this.props.userinfo} />
                <h1>Shopping Cart</h1>

                <div className="shopping-cart">

                    <div className="column-labels">
                        <label className="product-image">Image</label>
                        <label className="product-details">Product</label>
                        <label className="product-price">Price</label>
                        <label className="product-quantity">Quantity</label>
                        <label className="product-removal">Remove</label>
                        <label className="product-line-price">Total</label>
                    </div>

                    {itemList}

                    <div className="totals">
                        <div className="totals-item">
                            <label>Subtotal</label>
                            <div className="totals-value" id="cart-subtotal">{sum}</div>
                        </div>
                        <div className="totals-item">
                            <label>Tax (5%)</label>
                            <div className="totals-value" id="cart-tax">{0.05 * sum}</div>
                        </div>
                        <div className="totals-item">
                            <label>Shipping</label>
                            <div className="totals-value" id="cart-shipping">{5.00 * this.state.cartItems.length}</div>
                        </div>
                        <div className="totals-item totals-item-total">
                            <label>Grand Total</label>
                            <div className="totals-value" id="cart-total"><strong>{sum + sum * 0.05 + 15}</strong></div>
                        </div>
                    </div>

                    <StripeCheckout
                        className="checkout"
                        stripeKey="pk_test_51Gxt4GIY3uMkMao1o5wDkMtWsbEu4UgosWpYL5qFDXZUTZruG24dCGMPgID56kw8m8pPMRcaF7uISBAbfaGBCqal00Mcuc0lWq"
                        token={(token) => this.handleToken(token, sum = (sum + sum * 0.05 + 15))}
                        amount={(sum + sum * 0.05 + 15) * 100}
                        name="Payment Using Card"
                    />
                </div>
            </div>
        );
    }
}

export default withRouter(Cart);
