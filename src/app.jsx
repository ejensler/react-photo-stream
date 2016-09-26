import React from 'react';
import { render } from 'react-dom';

import oauthConfig from '../oauth-consumer-config.js';

import './app.scss';

import TopBar from './topbar.jsx';
import PhotoStream from './photostream.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      favoritesCount: 0
    };
    this.handleFavoritesCountChange = this.handleFavoritesCountChange.bind(this);
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
          endpoint="https://api.500px.com/v1/photos"
          consumerKey={oauthConfig.consumer_key}
          favoritesCountCallback={this.handleFavoritesCountChange}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
