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
        const res = await axios.get(`http://localhost:4000/getOrders?id=${this.props.userinfo.userId}`);
        console.log(res.data)
        this.setState({
            orders: res.data
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
                <div className="order" key={order.id}>
                    <h1>{order.id}</h1>
                    {
                        order.products.map(product => {
                            return (
                                <div key={product.id}>
                                    <li>{product.title}</li>
                                    <li>{product.orderItem.quantity}</li>
                                    <img src={product.imageUrl} alt={product.title} />
                                </div>
                            )
                        })
                    }
                </div>
            )
        })

        return (
            <div className="order-main">
                <Header logout={this.props.logout} userinfo={this.props.userinfo} />
                {
                    this.state.orders.length > 0 ? ordersList : <h1>No order placed 🙁</h1>
                }
            </div>
        );
    }
}
export default Orders;
