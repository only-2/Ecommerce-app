import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import { NavLink, withRouter } from 'react-router-dom';
import axios from 'axios';
import './Products.css';

class Products extends Component {

    addToCart = async () => {
        const res = await axios.get('http://localhost:4000/addtoCart');
        console.log(res.data)
        this.setState({ products: res.data });
    }

    handleClick = async (event, prodId) => {
        event.preventDefault()
        const userId = this.props.userId;
        console.log(this.props.userId, prodId);
        await axios.post('http://localhost:4000/addtoCart', {
            "userId": userId,
            "prodId": prodId
        })
        this.props.history.push('/viewcart')
        
    }

    render() {
        let itemList = this.props.products.map(item => {
            return (
                <li className="cards_item" key={item.id}>
                    <div className="card">
                        <div className="card_image">
                            <img src="https://picsum.photos/500/300/?image=10" alt={item.title} /></div>
                        <div className="card_content">
                            <h2 className="card_title">{item.title}</h2>
                            <p className="card_text">{item.desc}</p>
                            <p className="price">Price: {item.price}$</p>
                            <button className="prbtn card_btn">Read More</button>
                            <NavLink exact to="/cart" className="td-none">
                                <button
                                    className="prbtn card_btn"
                                    onClick={(e) => this.handleClick(e,item.id)}
                                >Add to Cart</button>
                            </NavLink>
                        </div>
                    </div>
                </li>
            )
        })

        return (
            <div>
                <Header logout={this.props.logout} isAdmin={this.props.isAdmin}/>

                <h1 className="center">Our items</h1>
                <ul className="cards">
                    {itemList}
                </ul>
            </div>
        );
    }
}

export default withRouter(Products);
