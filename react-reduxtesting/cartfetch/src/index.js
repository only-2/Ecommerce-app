import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'
import carreducer from './reducers/carreducer';
import prodreducer from './reducers/prodreducer';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const reducer = combineReducers({
    carreducer: carreducer,
    prodreducer: prodreducer
})
const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));