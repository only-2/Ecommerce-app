import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav id="navbar">
      <ul>
        <li>
          <NavLink to="/" className="nav-item">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/Products" className="nav-item">
            Products
          </NavLink>
        </li>
        <li>
          <NavLink to="/Aboutus" className="nav-item">
            About Us
          </NavLink>
        </li>
        <li className="nav-cart">
          <NavLink to="/Cart" className="nav-item">
            Cart
          </NavLink>
        </li>
        <li className="nav-login">
          <NavLink to="/Login" className="nav-item">
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
