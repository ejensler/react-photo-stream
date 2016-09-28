import React from 'react';
import { render } from 'react-dom';

import oauthConfig from '../oauth-consumer-config.js';

import './app.scss';

import { debounce } from 'lodash';

import TopBar from './topbar.jsx';
import PhotoStream from './photostream.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      favoritesCount: 0,
      columnCount: 4
    };
    this.handleFavoritesCountChange = this.handleFavoritesCountChange.bind(this);
  }

  componentWillMount() {
    // Add a debounced resize function to the window to change the number of columns depending on
    // the width
    const self = this;
    function onResizeFn() {
      let newColumnCount = 4;
      if (document.documentElement.offsetWidth < 500) {
        newColumnCount = 1;
      } else if (document.documentElement.offsetWidth < 1000) {
        newColumnCount = 2;
      } else if (document.documentElement.offsetWidth < 1500) {
        newColumnCount = 3;
      }
      self.setState({
        columnCount: newColumnCount
      });
    }
    // set the column count intially
    onResizeFn();
    window.addEventListener('resize', debounce(onResizeFn, 300));
  }

  handleFavoritesCountChange(type) {
    if (type === 'increment') {
      this.setState({	favoritesCount: this.state.favoritesCount + 1	});
    } else if (type === 'decrement') {
      this.setState({	favoritesCount: this.state.favoritesCount - 1	});
    }
  }

  render() {
    return (
      <div className="app-main">
        <TopBar favoritesCount={this.state.favoritesCount} />
        <PhotoStream
          columnCount={this.state.columnCount}
          consumerKey={oauthConfig.consumer_key}
          endpoint="https://api.500px.com/v1/photos"
          favoritesCountCallback={this.handleFavoritesCountChange}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
