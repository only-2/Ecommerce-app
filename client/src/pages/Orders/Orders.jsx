import React, { Component } from 'react'
import axios from 'axios';
import Header from '../../components/Header/Header';
import "./Orders.css"

class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: []
        }
    }

    getOrders = async () => {
        const data = [{
            title: "DELL XPS 15",
            imageUrl: "https://www.lifewire.com/thmb/eHrBCZqTCXeoCl7cSkBngIzaZAo=/1500x1500/filters:fill(auto,1)/_hero_SQ_Dell-XPS-13-Two-in-One-Computer-1-c8f6c090145a4de69ca1c90f75659abe.jpg",
            Price: 149000,
            Desc: "Dell’s smallest 39.62cm (15.6) performance laptop with a stunning OLED display option. Now featuring 9th Gen Intel® Core™ processors.",
            category: 'electronics',
            orderItem: '2'
        }, {
            title: "Now You See Her  (English, Paperback, Perks Heidi)",
            imageUrl: "https://rukminim1.flixcart.com/image/416/416/k1jlyfk0/book/7/8/2/now-you-see-her-original-imafk6a8wsjzt6cy.jpeg?q=70",
            Price: 399,
            Desc: "____________________________She was your responsibility. And now she's missing.`I flew through this book in three days, with my heart in my mouth' Lisa Jewell`Believe us when we say this novel is the real deal' Heat `A gripping tale of friendship and deceit, where nothing is what it seems....",
            category: 'books',
            orderItem: '1'
        }, {
            title: "iPhone 11",
            imageUrl: "https://rukminim1.flixcart.com/image/416/416/k2jbyq80pkrrdj/mobile-refurbished/x/j/s/iphone-11-128-d-mwm02hn-a-apple-0-original-imafkg242ugz8hwc.jpeg?q=70",
            Price: 73990,
            Desc: "Featuring a 15.49-cm (6.1) all-screen Liquid Retina LCD and a glass and aluminum design, the iPhone 11 is as beautiful as it gets. Also, the IP68 rating ensures that is water-resistant up to 2 meters for 30 minutes.",
            category: 'electronics',
            orderItem: '1'
        },]
        this.setState({
            orders: [{
                id: true,
                date: null,
                products: data
            }]
        });
        console.log(this.state)
    }
    componentWillMount() {
        this.getOrders();
    }

    render() {

        // let productList = this

        let ordersList = this.state.orders.map(order => {
            return (
                <div className="order-item" >
                    <h2 className="order-exp">Your Order ID Is - 12345</h2>
                    <h2 className="order-exp">Your Date Of Order Is - 16 Aug 2020</h2>
                    <h2 className="order-exp">Your Ordered Items Are:</h2>
                    {
                        order.products.map(product => {
                            return (
                                <div key={product.id} className="order-details">
                                    <img src={product.imageUrl} alt={product.title} className="order-img" />
                                    <div className="order-q">
                                        <p className="order-p">Ordered Item Name:</p>
                                        <li>{product.title}</li>
                                        <p className="order-p">Ordered Item Quantitiy:</p>
                                        <li>{product.orderItem}</li>
                                        <p className="order-p">Ordered Item Price:</p>
                                        <li>{product.price}</li>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <hr />
                </div>
            )
        })

        return (
            <div className="order-main">
                <Header logout={this.props.logout} userinfo={this.props.userinfo} />

                <div className="order-container">
                    <h1 className="container-head">Hi, Welcome To The Payment History</h1>
                    <h1 className="container-email">Any Issues? Email Us : Flipkart_CustomerCare@gmail.com</h1>
                    <hr />
                    {this.state.orders > 0 ? ordersList : <h1>No orders placed <span role="img" aria-label="sheep">🙁</span></h1>}
                </div>

            </div>
        );
    }
}
export default Orders;
