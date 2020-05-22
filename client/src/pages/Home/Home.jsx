import React, { Component } from 'react'
import Navbar from '../../components/Navbar';
import Slider from '../../components/Slider';
import Category from '../../components/Category';
class Home extends Component {
    render() {
        return (
            <div className="Home">
                <Navbar />
                <Slider />
                <Category />
            </div>
        );
    }
}

export default Home;