import React, { Component } from 'react';
import { connect } from 'react-redux'
import fetchProducts from '../fetchapi/fetch';
import addCart from '../fetchapi/addCart';

class Home extends Component {

    componentDidMount() {
        const { fetchProducts } = this.props;
        fetchProducts();
    }
    handleClick = () => {
        console.log("inside handleClick");


        const { addCart } = this.props;
        addCart();
    }


    render() {
        console.log("THIS");
        console.log(this.props.items);


        let itemList = this.props.items.map(item => {
            return (
                <div className="card" key={item.id}>
                    <div className="card-image">

                        <span className="card-title">{item.title}</span>
                        <span to="/" className="btn-floating halfway-fab waves-effect waves-light red" onClick={() => { this.handleClick() }}><i className="material-icons">add</i></span>
                    </div>

                    <div className="card-content">
                        <p>{item.body}</p>

                    </div>
                </div>

            )
        })

        return (
            <div className="container">
                <h3 className="center">Our items</h3>
                <div className="box">
                    {itemList}
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        items: state.prodreducer.items,
        error: state.prodreducer.error,
        pending: state.prodreducer.pending
    }
}
const dispactStateToProps = (dispatch) => {
    return {

        fetchProducts: () => { dispatch(fetchProducts()) },
        addCart: () => { dispatch(addCart()) }
    }

}


export default connect(mapStateToProps, dispactStateToProps)(Home)