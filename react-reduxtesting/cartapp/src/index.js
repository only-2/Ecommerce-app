import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'
import cartreducer from './reducers/cartreducer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';


const store = createStore(cartreducer, applyMiddleware(thunk));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));