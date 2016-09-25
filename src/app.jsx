import React from 'react';
import { render } from 'react-dom';

import oauthConfig from '../oauth-consumer-config.js';

import './app.scss';

import TopBar from './topbar.jsx';
import PhotoStream from './photostream.jsx';


class App extends React.PureComponent {
  render() {
    return (
      <div className="app-main">
        <TopBar />
        <PhotoStream endpoint="https://api.500px.com/v1/photos" consumerKey={oauthConfig.consumer_key} />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
