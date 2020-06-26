import React, { Component } from 'react';
// import ReactImageMagnify from 'react-image-magnify';
import Header from '../../components/Header/Header';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import './ProductView.css';

class ProductView extends Component {


    handleClick = async (event, prodId) => {
        event.preventDefault();
        const userId = this.props.userinfo.userId;
        // console.log(this.props.userinfo.userId, prodId);
        await axios.post('http://localhost:4000/addtoCart', {
            "userId": userId,
            "prodId": prodId
        })
        this.props.history.push('/viewcart')
    }

    goBack = (event) => {
        event.preventDefault();
        this.props.history.push('/products');
    }

    render() {
        return (
            <>
                <Header logout={this.props.logout} userinfo={this.props.userinfo} />
                <div className="prodcontainer">
                    <div className="prodimg">
                        {/* <ReactImageMagnify {...{
                            imageClassName: "cover",
                            smallImage: {
                                alt: 'Wristwatch by Ted Baker London',
                                src: this.props.product.imageUrl,
                                // sizes: '(max-width: 300px)',
                                isFluidWidth: true,
                                height: 500,
                                width: '100%',
                                // srcSet: this.srcSet,
                                sizes: '(max-width: 480px) 100vw, (max-width: 1200px) 30vw, 360px',
                                


                            },
                            largeImage: {
                                src: this.props.product.imageUrl,
                                width: 1800,
                                height: 1800,
                            },
                            // shouldUsePositiveSpaceLens: true,
                            lensStyle: {
                                background: 'hsla(0, 0%, 100%, .3)',
                                width:20,
                                height:20,
                                border: '1px solid #ccc'
                            },
                            isHintEnabled: true,

                        }} /> */}
                        <img className="cover" src={this.props.product.imageUrl} alt="hello" />

                        <button
                            className="addbtn"
                            onClick={(e) => this.handleClick(e, this.props.product.id)}
                        > <div id="slide"></div>Add To Cart
                        </button>

                        <button className="continue" onClick={this.goBack}>Continue Shopping</button>
                    </div>
                    <div className="proddetails">
                        <div className="prodin">
                            <div className="prodtitle">
                                <h1>{this.props.product.title}</h1>
                            </div>
                            <hr />
                            <div className="proddesc">
                                <p><strong>Product Description:</strong></p><br></br><br></br>
                                <p>{this.props.product.description}</p>
                            </div>
                            <hr />
                            <div className="prodprice">
                                <h3>{"Price: " + this.props.product.price + " $"}</h3>
                            </div>
                            <hr />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(ProductView);