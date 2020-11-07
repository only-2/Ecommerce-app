import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import { NavLink, withRouter } from 'react-router-dom';
import Slide from './Slide';
import axios from 'axios';
import landingData from './landingData';
import './Products.css';

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: null,
            activeIndex: 0,
            length: landingData[this.props.slider].length,
            interval: 0
        }
    }

    handleRead = async (event, prod) => {
        event.preventDefault();
        this.props.updateSingleProduct(prod)
        this.props.history.push('/product-view')
    }

    handleClick = async (event, prodId) => {
        event.preventDefault();
        // console.log(this.props.userinfo.userId, prodId);
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

    // Slider Functions
    componentDidMount() {
        this.interval = setInterval(this.autoplay(), 4000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    autoplay = () => {
        this.goToNextSlide();
    }
    goToPrevSlide = () => {
        let index = this.state.activeIndex;
        let length = this.state.length;
        if (index < 1) {
            index = length - 1;
        }
        else {
            index--;
        }
        this.setState({
            ...this.state,
            activeIndex: index
        });
        clearInterval(this.interval);
        this.interval = setInterval(this.autoplay, 4000);
    }
    goToNextSlide = () => {
        let index = this.state.activeIndex;
        let length = this.state.length;
        // console.log(index);
        // console.log(length);
        if (index === length - 1) {
            index = 0
        } else {
            index++;
        }
        this.setState({
            ...this.state,
            activeIndex: index
        });
        clearInterval(this.interval);
        this.interval = setInterval(this.autoplay, 4000);
    }
    setLength = len => {
        this.setState({ length: len });
    }

    render() {
        let itemList = this.props.products.map(item => {
            return (
                <li className="cards_item" key={item.id}>
                    <div className="card">
                        <div className="card_image">
                            <img src={item.imageUrl} className="prod-img" alt={item.title} /></div>
                        <div className="card_content">
                            <h2 className="card_title">{item.title}</h2>
                            <p className="card_text">{item.desc}</p>
                            <p className="price">Price: <span>&#8377;</span>{item.price}</p>
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

                            {
                                !this.props.userinfo.isAdmin
                                &&
                                <NavLink exact to="/cart" className="td-none">
                                    <button
                                        className="prbtn card_btn"
                                        onClick={(e) => this.handleClick(e, item.id)}
                                    >Add to Cart</button>
                                </NavLink>
                            }
                        </div>
                    </div>
                </li>
            )
        })

        return (
            <div>
                <Header logout={this.props.logout} userinfo={this.props.userinfo} />

                <div className="prod_home">

                    <Slide
                        activeIndex={this.state.activeIndex}
                        slider={this.props.slider}
                        setLength={this.setLength}
                    />

                    <div className="prod_controls">
                        <div className="prod_prev" onClick={this.goToPrevSlide}>
                            <i className="fas fa-angle-left"></i>
                        </div>
                        <div className="prod_next" onClick={this.goToNextSlide}>
                            <i className="fas fa-angle-right"></i>
                        </div>
                    </div>
                </div>

                <h1 className="center">Our items</h1>
                <ul className="cards">
                    {itemList}
                </ul>
            </div>
        );
    }
}

export default withRouter(Products);
