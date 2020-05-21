import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./index.css";

import Home from "./components/Home";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path='/' component={Home}></Route>
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
