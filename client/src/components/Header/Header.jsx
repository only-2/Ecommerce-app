/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import "./Header.css"

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wid: ''
        }
    }
    openNav = () => {
        this.setState({
            wid: '100%'
        })
    }
    closeNav = () => {
        this.setState({
            wid: '0%'
        })
    }
    render() {
        return (
            <div>
                <header>
                    <NavLink exact to="/"><img className="nav-img" src="/logo.png" alt="logo" /></NavLink>
                    <nav>
                        <ul className="nav__links">
                            <li><button onClick={this.props.logout} className="auth-btn-nav">
                                Logout
                            </button></li>
                            <li><NavLink exact to="/category">
                                <span role="img" aria-label="">🛍️ </span> Products
                            </NavLink></li>
                            {this.props.isAdmin && <li><NavLink exact to="/admin">
                                <span role="img" aria-label="">📜 </span>Admin Power
                            </NavLink></li>}
                            <li><NavLink exact to="/viewcart">
                                <span role="img" aria-label="">🛒 </span>Cart
                            </NavLink></li>

                        </ul>
                    </nav>
                    <p onClick={this.openNav} className="menu cta">Menu</p>
                </header>

                <div style={{ width: this.state.wid }} className="overlay">
                    <a className="close" onClick={this.closeNav}>&times;</a>
                    <div className="overlay__content">
                        <NavLink exact to="/">
                            <span role="img" aria-label="">🛍️</span> Shop
                        </NavLink>
                        <NavLink exact to="/products">
                            <span role="img" aria-label="">🏬</span> Products
                        </NavLink>
                        {this.props.isAdmin && <NavLink exact to="/adminProduct">
                            <span role="img" aria-label="">📜</span>Add Product
                        </NavLink>}
                        <NavLink exact to="/viewcart">
                            <span role="img" aria-label="">🛒</span>Cart
                        </NavLink>
                    </div>
                </div>

            </div>
        );
    }
}

export default Header;