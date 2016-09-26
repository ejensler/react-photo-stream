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

  mapPhotoColumns(photosToMap) {
    const mappedPhotos = [];
    // define number of columns
    const columnCount = 4;
    // We want to populate each column one at a time, can use array of arrays
    const photoColumns = [];
    for (let i = 0; i < columnCount; i++) {
      mappedPhotos.push([]);
      photoColumns.push(<PhotoColumn
        key={i}
        photos={mappedPhotos[i]}
        favoritesCountCallback={this.props.favoritesCountCallback}
      />);
    }
    photosToMap.photos.forEach((photo, index) => {
      const indexToPopulate = index % columnCount;
      mappedPhotos[indexToPopulate].push(photo);
    });
    return photoColumns;
  }

  render() {
    const photoColumns = this.mapPhotoColumns(this.state.photoData);
    return (
      <section className="photostream-container">
        {photoColumns}
      </section>
    );
  }
}

PhotoStream.propTypes = {
  favoritesCountCallback: React.PropTypes.func.isRequired,
  endpoint: React.PropTypes.string.isRequired,
  consumerKey: React.PropTypes.string.isRequired,
};


class PhotoColumn extends React.PureComponent {
  render() {
    const photoTiles = this.props.photos.map((photo, index) =>
      <PhotoTile
        {...photo}
        key={index}
        favoritesCountCallback={this.props.favoritesCountCallback}
      />
    );
    return (
      <div className="photocolumn">
        {photoTiles}
      </div>
    );
  }
}
