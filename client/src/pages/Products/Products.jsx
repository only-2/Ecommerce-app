import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import { NavLink, withRouter } from 'react-router-dom';
import axios from 'axios';
import './Products.css';

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: null
        }
    }

    handleRead = async (event, prod) => {
        event.preventDefault();
        this.props.updateSingleProduct(prod)
        this.props.history.push('/product-view')
    }

    handleClick = async (event, prodId) => {
        event.preventDefault();
        const userId = this.props.userinfo.userId;
        // console.log(this.props.userinfo.userId, prodId);
        await axios.post('http://localhost:4000/addtoCart', {
            "userId": userId,
            "prodId": prodId
        })
        this.props.history.push('/viewcart')
    }

    handleDelete = async (event, prodId) => {
        event.preventDefault();
        const userId = this.props.userinfo.userId;
        // console.log(this.props.userinfo.userId, prodId);
        const res = await axios.post('http://localhost:4000/deleteProd', {
            "userId": userId,
            "prodId": prodId
        })
        if (res.data.status === "success") {
            toast("Success! Product deleted", { type: "success" });
        } else {
            toast("Something went wrong. Try again Later", { type: "error" });
        }
        this.props.history.push('/')
    }

    render() {
        let itemList = this.props.products.map(item => {
            return (
                <li className="cards_item" key={item.id}>
                    <div className="card">
                        <div className="card_image">
                            <img src={item.imageUrl} alt={item.title} /></div>
                        <div className="card_content">
                            <h2 className="card_title">{item.title}</h2>
                            <p className="card_text">{item.desc}</p>
                            <p className="price">Price: {item.price}$</p>
                            <button
                                className="prbtn card_btn"
                                onClick={(e) => this.handleRead(e, item)}
                            >Read More
                            </button>
                            {
                                this.props.userinfo.isAdmin
                                &&
                                <NavLink exact to="/cart" className="td-none">
                                    <button
                                        className="prbtn card_btn"
                                        onClick={(e) => this.handleDelete(e, item.id)}
                                    >Delete Product</button>
                                </NavLink>
                            }
                            <NavLink exact to="/cart" className="td-none">
                                <button
                                    className="prbtn card_btn"
                                    onClick={(e) => this.handleClick(e, item.id)}
                                >Add to Cart</button>
                            </NavLink>
                        </div>
                    </div>
                </li>
            )
        })

        return (
            <div>
                <Header logout={this.props.logout} userinfo={this.props.userinfo} />

                <h1 className="center">Our items</h1>
                <ul className="cards">
                    {itemList}
                </ul>
            </div>
        );
    }
}

export default withRouter(Products);
