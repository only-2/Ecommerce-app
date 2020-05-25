// import React, { Component } from 'react';
// import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
// import fetchCart from '../fetchapi/fetchcart';
// import remove from '../fetchapi/remove';
// import addUpdate from '../fetchapi/addUpdate';
// import subUpdate from '../fetchapi/subUpdate'
// class Cart extends Component {
//     componentDidMount() {
//         const { fetchCart } = this.props;
//         fetchCart();
//     }

//     //to remove the item completely
//     handleRemove = (id) => {
//         this.props.remove(id);
//     }
//     //to add the quantity
//     handleAddQuantity = (id) => {
//         this.props.addUpdate(id);
//     }
//     //to substruct from the quantity
//     handleSubtractQuantity = (id) => {
//         this.props.subUpdate(id);
//     }
//     render() {

//         let addedItems = this.props.items.length ?
//             (
//                 this.props.items.map(item => {
//                     return (

//                         <li className="collection-item avatar" key={item.id}>
//                             <div className="item-img">
//                                 <img src={item.img} alt={item.img} />
//                             </div>
//                             <div className="item-desc">
//                                 <span className="title">{item.title}</span>
//                                 <p>{item.desc}</p>
//                                 <p><b>Price: {item.price}$</b></p>
//                                 <p>
//                                     <b>Quantity: {item.quantity}</b>
//                                 </p>
//                                 <div className="add-remove">
//                                     <Link to="/cart"><i className="material-icons" onClick={() => { this.handleAddQuantity(item.id) }}>arrow_drop_up</i></Link>
//                                     <Link to="/cart"><i className="material-icons" onClick={() => { this.handleSubtractQuantity(item.id) }}>arrow_drop_down</i></Link>
//                                 </div>
//                                 <button className="waves-effect waves-light btn pink remove" onClick={() => { this.handleRemove(item.id) }}>Remove</button>
//                             </div>
//                         </li>
//                     )
//                 })
//             ) :

//             (
//                 <p>Nothing.</p>
//             )
//         return (
//             <div className="container">
//                 <div className="cart">
//                     <h5>You have ordered:</h5>
//                     <ul className="collection">
//                         {addedItems}
//                     </ul>
//                 </div>
//             </div>
//         )
//     }
// }
// const mapStateToProps = (state) => {
//     return {
//         items: state.carreducer.addedItems,
//         error: state.carreducer.error,
//         pending: state.carreducer.pending
//     }
// }
// const mapDispatchToProps = (dispatch) => {
//     return {
//         remove: (id) => { dispatch(remove(id)) },
//         addUpdate: (id) => { dispatch(addUpdate(id)) },
//         subUpdate: (id) => { dispatch(subUpdate(id)) },
//         fetchCart: (id) => { dispatch(fetchCart()) }
//     }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(Cart)