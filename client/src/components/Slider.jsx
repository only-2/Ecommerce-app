import React, { Component } from "react";
import { NavLink } from 'react-router-dom';

class Slider extends Component {

    componentDidMount() {
        const head = document.querySelector("head");
        const script = document.createElement("script");
        script.setAttribute(
            "src",
            "../script.js"
        );
        head.appendChild(script);
    }

    render() {

        return (
            <section className="home" >
                <div className="slider">
                    <div
                        className="slide active"
                        style={{
                            backgroundImage: `url(${require("../images/slide-1.jpg")})`,
                        }}>
                        <div className="container">
                            <div className="caption">
                                <h1>1. Winter Collection 2020</h1>
                                <p>Lorem ipsum dummy text goes here.</p>
                                <NavLink exact to="/viewcart">Shop Now</NavLink>
                            </div>
                        </div>
                    </div>
                    <div
                        className="slide"
                        style={{
                            backgroundImage: `url(${require("../images/slide-2.jpg")})`,
                        }}>
                        <div className="container">
                            <div className="caption">
                                <h1>2. Winter Collection 2020</h1>
                                <p>Lorem ipsum dummy text goes here.</p>
                                <NavLink exact to="/viewcart">Shop Now</NavLink>
                            </div>
                        </div>
                    </div>
                    <div
                        className="slide"
                        style={{
                            backgroundImage: `url(${require("../images/slide-3.jpg")})`,
                        }}>
                        <div className="container">
                            <div className="caption">
                                <h1>3. Winter Collection 2020</h1>
                                <p>Lorem ipsum dummy text goes here.</p>
                                <NavLink exact to="/viewcart">Shop Now</NavLink>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="controls">
                    <div className="prev">
                        <i className="fas fa-angle-left"></i>
                    </div>
                    <div className="next">
                        <i className="fas fa-angle-right"></i>
                    </div>
                </div>
            </section >
        );
    }
}

export default Slider