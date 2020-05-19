import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/Header';
import './index.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
