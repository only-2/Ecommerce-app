import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./index.css";
import Home from "./components/Home";
import AddProduct from "./components/AddProduct";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Home}></Route>
      <Route exact path='/addProduct' component={AddProduct}></Route>
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
