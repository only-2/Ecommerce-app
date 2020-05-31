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
        this.props.history.push('/products')
        
    }
    getBooks = async () => {
        const res = await axios.get('http://localhost:4000/getBooks');
        console.log(res.data)
        this.props.updateProd(res.data);
        this.props.history.push('/products')
    }
    getMensfashion = async () => {
        const res = await axios.get('http://localhost:4000/getMensfashion');
        console.log(res.data)
        this.props.updateProd(res.data);
        this.props.history.push('/products')
    }
    getWomensfashion = async () => {
        const res = await axios.get('http://localhost:4000/getWomensfashion');
        console.log(res.data)
        this.props.updateProd(res.data);
        this.props.history.push('/products')
    }


    render() {
        return (
            <div>
            <Header logout={this.props.logout} isAdmin={this.props.isAdmin}/>
                <h1>EXPLORE INDIA'S LARGEST ONLINE STORE</h1>
                <section className="category" id="category">
                    <div className="item1">
                        <button className="btn" onClick={this.getElectronics}>Shop Now</button>
                    </div>
                    <div className="item2">
                        <button className="btn" onClick={this.getBooks}>Shop Now</button>
                    </div>
                    <div className="item3">
                        <button className="btn" onClick={this.getMensfashion}>Shop Now</button>
                    </div>
                    <div className="item4">
                        <button className="btn" onClick={this.getWomensfashion}>Shop Now</button>
                    </div>
                    <div className="item5">
                        <button className="btn" onClick={this.getElectronics}>Shop Now</button>
                    </div>
                    <div className="item6">
                        <button className="btn" onClick={this.getElectronics}>Shop Now</button>
                    </div>
                </section>
            </div>
        );
    }
}

export default withRouter(Category);
