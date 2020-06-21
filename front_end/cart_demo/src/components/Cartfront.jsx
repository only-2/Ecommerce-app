import React, { Component } from 'react';
import '../cartfront.css';
class Cartfront extends Component {
    render() {
        return (
            <div className="cartcontainer">
                <div className="cartitems">
                    <div className="carthead">MY CART</div>
                    <img className="cover rightimg" style={{ height: "87px", width: "87px" }} src={require('../imgs/img6.svg')} alt="hello" />
                    <div className="cartitem">
                        <img className="cover" src={require('../imgs/img1.jpg')} alt="hello" />
                        <div className="cartcontent">
                            <h1>Item Title</h1><br></br>
                            {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, aut.</p> */}
                            <p>Item Price : <strong>300$</strong></p>
                            <div className="dum">
                                <button className="addbtn">+</button>
                                <input type="number" className="inp" />
                                <button className="subbtn">-</button>
                                <button className="remove">REMOVE</button>
                            </div>

                        </div>


                    </div>
                    <div className="cartitem">
                        <img className="cover" src={require('../imgs/img1.jpg')} alt="hello" />
                        <div className="cartcontent">
                            <h1>Item Title</h1><br></br>
                            {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, aut.</p> */}
                            <p>Item Price : <strong>300$</strong></p>
                            <div className="dum">
                                <button className="addbtn">+</button>
                                <input type="number" className="inp" />
                                <button className="subbtn">-</button>
                                <button className="remove">REMOVE</button>
                            </div>

                        </div>


                    </div>
                </div>
                <div className="checkout">
                    <div className="chcontainer">
                        <div className="pricedetails">Price Details</div>
                        <hr />
                        <div className="price">
                            <div className="prtotal">Price</div>
                            <div className="amount">5600$</div>
                        </div>
                        <hr />
                        <div className="delivery">
                            <div className="del">Delivery Fee</div>
                            <div className="delamount">Free</div>
                        </div>
                        <hr />
                        <div className="total">
                            <div className="tot">Total Amount</div>
                            <div className="totamount">5600$</div>
                        </div>
                        <button className="chbtn "><span>CHECKOUT</span></button>
                    </div>

                </div>
            </div>
        );
    }
}

export default Cartfront;