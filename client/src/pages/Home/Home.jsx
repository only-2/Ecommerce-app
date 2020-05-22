import React, { Component } from 'react'
// import Navbar from '../../components/Navbar';
import Header from '../../components/Header/Header';
import Slider from '../../components/Slider';
import Category from '../../components/Category';
class Home extends Component {
    render() {
        return (
            <div className="Home">
                <Header />
                <Slider />
                <Category />
            </div>
        );
    }
}

export default Home;