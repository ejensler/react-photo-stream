import React from 'react';
import 'whatwg-fetch';

import PhotoTile from './phototile.jsx';

export default class PhotoStream extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photoData: { photos: [] }
    };
  }

  componentDidMount() {
    const url = new URL(this.props.endpoint);
    const params = {
      consumer_key: this.props.consumerKey,
      // feature: 'popular',
      username: 'seanarcher',
      sort: 'date_created',
      image_size: 4
    };
    const self = this;
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    fetch(url)
      .then(self.handleRequest)
      .then(res => {
        self.setState({
          photoData: res
        });
      });
  }

  handleRequest(res) {
    if (res.status >= 200 && res.status < 300) {
      return res.json();
    }
    const error = new Error(res.statusText);
    error.response = res;
    throw error;
  }

  render() {
    const photoTiles = this.state.photoData.photos.map((photo) =>
      <PhotoTile {...photo} key={photo.id} />
    );
    return (
      <section className="photostream-container">
        {photoTiles}
      </section>
    );
  }
}

PhotoStream.propTypes = {
  endpoint: React.PropTypes.string.isRequired,
  consumerKey: React.PropTypes.string.isRequired,
};
