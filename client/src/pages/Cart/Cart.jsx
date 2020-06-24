import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import axios from 'axios';
import './Cart.css';

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartItems: []
        }
    }

    getCartItems = async () => {
        const res = await axios.get('http://localhost:4000/getCartProducts');
        console.log(res.data)
        this.setState({ cartItems: res.data });
        console.log(this.state)
    }

    componentWillMount() {
        this.getCartItems();
    }

    remove = async (event, prodId) => {
        event.preventDefault();
        await axios.post('http://localhost:4000/deleteFromCart', {
            "prodId": prodId
        });
        console.log("Removed item", prodId);
        this.getCartItems();
    }

    render() {
        let sum = 0;

        let itemList = this.state.cartItems.map(item => {
            return (
                <div className="product" key={item.id}>
                    <div className="product-image">
                        <img src={item.imageUrl} alt={item.title}/>
                    </div>
                    <div className="product-details">
                        <div className="product-title">{item.title}</div>
                        <p className="product-description">{item.description}</p>
                    </div>
                    <div className="product-price">{item.price}</div>
                    <div className="product-quantity">
                        <input type="number" value={item.cartItem.quantity} min="1" />
                    </div>
                    <div className="product-removal">
                        <button className="remove-product" onClick={(e) => this.remove(e,item.cartItem.productId)}>
                            Remove
                    </button>
                    </div>
                    <div style={{display: 'none'}}>{sum += item.price * item.cartItem.quantity}</div>
                    <div className="product-line-price">{item.price * item.cartItem.quantity}</div>
                </div>
            )
        })


        return (
            <div className="cart-overall">
                <Header logout={this.props.logout} isAdmin={this.props.isAdmin}/>
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
                            <div className="totals-value" id="cart-shipping">15.00</div>
                        </div>
                        <div className="totals-item totals-item-total">
                            <label>Grand Total</label>
                            <div className="totals-value" id="cart-total">{sum + sum * 0.05 + 15}</div>
                        </div>
                    </div>

                    <button className="checkout">Checkout</button>

                </div>
            </div>
        );
    }
}

export default Cart;
