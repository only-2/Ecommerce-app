import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Shop from './components/Shop';
import Cart from './components/Cart';

function App() {
  return (


    <BrowserRouter>
      <div className="App">
        <Navbar />

        <Route exact path='/' component={Shop}></Route>
        <Route exact path='/cart' component={Cart}></Route>


      </div>
    </BrowserRouter>


  );
}

export default App;
