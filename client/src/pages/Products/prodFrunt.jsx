import React, { Component } from 'react';
// import ReactImageMagnify from 'react-image-magnify';
import '../prodFront.css';
// import dummy from '../imges/img1.jpg';
class Prodfront extends Component {
    render() {
        return (
            <div className="prodcontainer">
                <div className="prodimg">
                    {/* <ReactImageMagnify {...{
                        smallImage: {
                            alt: 'Wristwatch by Ted Baker London',
                            isFluidWidth: true,
                            src: dummy,
                            // sizes: '(max-width: 300px) 100vw, (max-width: 400px) 30vw, 360px'
                            height: 500,
                            width: '100%'

                        },
                        largeImage: {
                            src: dummy,
                            width: 1200,
                            height: 1500
                        }
                    }} /> */}
                    <img className="cover" src={require('../imges/img1.jpg')} alt="hello" />
                    <button className="addbtn"><div id="slide"></div>Add To Cart</button>
                    <button className="continue">Continue Shopping</button>
                </div>
                <div className="proddetails">
                    <div className="prodin">
                        <div className="prodtitle">
                            <h1>Product Title</h1>
                        </div>
                        <hr />
                        <div className="proddesc">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, molestias laborum quo, harum numquam voluptate ut consectetur eaque quisquam expedita illum suscipit? Ipsam sunt id, ducimus minus animi praesentium, at numquam illum quaerat unde eveniet accusantium consectetur dolores quidem rerum?</p>
                        </div>
                        <hr />
                        <div className="prodprice">
                            <h3>Price: 2000$</h3>
                        </div>
                        <hr />
                    </div>

                </div>
            </div>
        );
    }
}

export default Prodfront;