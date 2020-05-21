import React, { Component } from 'react'
import Navbar from './Navbar';
import Slider from './Slider';
import Category from './Category';
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