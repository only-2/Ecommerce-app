import React, { Component } from 'react';

class Category extends Component {
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
            <React.Fragment>
                <section className="category">
                    <div className="slider">
                        <div className="slide active" style={{
                            backgroundImage: `url(${require("../imagescat/img1.jpg")})`,
                        }}>
                            <div className="container">
                                <div className="caption">
                                    <h1>Heaphones</h1>
                                    <p><u>Starting from <strong>499</strong></u></p>
                                </div>
                            </div>
                        </div>
                        <div className="slide" style={{
                            backgroundImage: `url(${require("../imagescat/img2.jpg")})`,
                        }}>
                            <div className="container">
                                <div className="caption">
                                    <h1>Televisions</h1>
                                    <p><u>Starting from <strong>11999</strong></u></p>
                                </div>
                            </div>
                        </div>
                        <div className="slide" style={{
                            backgroundImage: `url(${require("../imagescat/img4.jpg")})`,
                        }}>
                            <div className="container">
                                <div className="caption">
                                    <h1>Air Conditioners</h1>
                                    <p><u>Starting from <strong>25999</strong></u></p>
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
                </section>
                <section className="cardheader">
                    SHOP FROM MORE THAN 50 BRANDS
                </section>
                <section className="cards">
                    <div className="cardItem">
                        <img className="cover" src={require('../imagescat/img5.jpg')} alt="hello" />
                        <div className="cardcontent">
                            <h2>Product Title</h2>
                            <h3>Price:30$</h3>
                            <button className="cardbtn">
                                Veiw Details
                    </button>
                        </div>

                    </div>
                    <div className="cardItem">
                        <img className="cover" src={require('../imagescat/img5.jpg')} alt="hello" />
                        <div className="cardcontent">
                            <h2>Product Title</h2>
                            <h3>Price:30$</h3>
                            <button className="cardbtn">
                                Veiw Details
                    </button>
                        </div>

                    </div>
                    <div className="cardItem">
                        <img className="cover" src={require('../imagescat/img5.jpg')} alt="hello" />
                        <div className="cardcontent">
                            <h2>Product Title</h2>
                            <h3>Price:30$</h3>
                            <button className="cardbtn">
                                Veiw Details
                    </button>
                        </div>

                    </div>
                    <div className="cardItem">
                        <img className="cover" src={require('../imagescat/img5.jpg')} alt="hello" />
                        <div className="cardcontent">
                            <h2>Product Title</h2>
                            <h3>Price:30$</h3>
                            <button className="cardbtn">
                                Veiw Details
                    </button>
                        </div>

                    </div>
                    <div className="cardItem">
                        <img className="cover" src={require('../imagescat/img5.jpg')} alt="hello" />
                        <div className="cardcontent">
                            <h2>Product Title</h2>
                            <h3>Price:30$</h3>
                            <button className="cardbtn">
                                Veiw Details
                    </button>
                        </div>

                    </div>
                    <div className="cardItem">
                        <img className="cover" src={require('../imagescat/img5.jpg')} alt="hello" />
                        <div className="cardcontent">
                            <h2>Product Title</h2>
                            <h3>Price:30$</h3>
                            <button className="cardbtn">
                                Veiw Details
                    </button>
                        </div>

                    </div>
                </section>
            </React.Fragment>
        );
    }
}

export default Category