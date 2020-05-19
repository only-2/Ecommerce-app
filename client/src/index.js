import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from './components/Home';
import Shop from './components/Shop';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/shop" component={Shop} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
