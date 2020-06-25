import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import Header from '../../components/Header/Header';
import './Category.css';

class Category extends Component {

    getElectronics = async (event) => {
        event.preventDefault();
        const res = await axios.get('http://localhost:4000/getElectronics');
        console.log(res.data)
        this.props.updateProd(res.data);
        this.props.updateSliderPos('electronics');
        this.props.history.push('/products')
    }
    getBooks = async () => {
        const res = await axios.get('http://localhost:4000/getBooks');
        console.log(res.data)
        this.props.updateProd(res.data);
        this.props.updateSliderPos('books');
        this.props.history.push('/products')
    }
    getKids = async () => {
        const res = await axios.get('http://localhost:4000/getKids');
        console.log(res.data)
        this.props.updateProd(res.data);
        this.props.updateSliderPos('kids');
        this.props.history.push('/products')
    }
    getApparels = async () => {
        const res = await axios.get('http://localhost:4000/getApparels');
        console.log(res.data)
        this.props.updateProd(res.data);
        this.props.updateSliderPos('apparels');
        this.props.history.push('/products')
    }
    getHomeandfurniture = async () => {
        const res = await axios.get('http://localhost:4000/getHomeandfurniture');
        console.log(res.data)
        this.props.updateProd(res.data);
        this.props.updateSliderPos('homeandfurniture');
        this.props.history.push('/products')
    }


    render() {
        return (
            <div>
            <Header logout={this.props.logout} userinfo={this.props.userinfo}/>
                <h1>EXPLORE INDIA'S LARGEST ONLINE STORE</h1>
                <section className="category" id="category">
                    <div className="item1">
                        <button className="btn" onClick={this.getElectronics}>Shop Now</button>
                    </div>
                    <div className="item2">
                        <button className="btn" onClick={this.getBooks}>Shop Now</button>
                    </div>
                    <div className="item3">
                        <button className="btn" onClick={this.getApparels}>Shop Now</button>
                    </div>
                    <div className="item4">
                        <button className="btn" onClick={this.getKids}>Shop Now</button>
                    </div>
                    <div className="item5">
                        <button className="btn" onClick={this.getHomeandfurniture}>Shop Now</button>
                    </div>
                    {<div className="item6">
                        <button className="btn" onClick={this.getElectronics}>Shop Now</button>
                    </div>}
                </section>
            </div>
        );
    }
}

export default withRouter(Category);
