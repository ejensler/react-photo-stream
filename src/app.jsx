import React from 'react';
import { render } from 'react-dom';

import './app.scss';

import Navbar from './navbar.jsx';
import PhotoStream from './photostream.jsx';


class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="app-main">
        <Navbar />
        <PhotoStream endpoint="" />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
