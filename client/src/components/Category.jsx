import React from "react";
import { NavLink } from 'react-router-dom';

const Category = () => {
  return (
    <div>
      <h1>EXPLORE INDIA'S LARGEST ONLINE STORE</h1>
      <section className="category" id="category">
        <div className="item1">
          <NavLink exact to="/category"><button className="btn">Shop Now</button></NavLink>
        </div>
        <div className="item2">
          <NavLink exact to="/category"><button className="btn">Shop Now</button></NavLink>
        </div>
        <div className="item3">
          <NavLink exact to="/category"><button className="btn">Shop Now</button></NavLink>
        </div>
        <div className="item4">
          <NavLink exact to="/category"><button className="btn">Shop Now</button></NavLink>
        </div>
        <div className="item5">
          <NavLink exact to="/category"><button className="btn">Shop Now</button></NavLink>
        </div>
        <div className="item6">
          <NavLink exact to="/category"><button className="btn">Shop Now</button></NavLink>
        </div>
      </section>
    </div>
  );
};

export default Category;
