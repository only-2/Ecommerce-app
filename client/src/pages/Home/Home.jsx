import React, { Component } from 'react'
// import Navbar from '../../components/Navbar';
import Header from '../../components/Header/Header';
import Slider from '../Slider/Slider';
import Category from '../../components/Category';
class Home extends Component {
    render() {
        return (
            <div className="Home">
                <Header logout={this.props.logout} userinfo={this.props.userinfo}/>
                <Slider />
                <Category />
            </div>
        );
    }
}

export default Home;