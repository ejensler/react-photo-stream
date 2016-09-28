import React from 'react';
import 'whatwg-fetch';

import PhotoTile from './phototile.jsx';

import './photostream.scss';

import { throttle } from 'lodash';

export default class PhotoStream extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPagePhotoData: { photos: [] },
      allPhotos: [],
      pageLoaded: 0
    };
    this.fetchPhotos = this.fetchPhotos.bind(this);
  }

  componentDidMount() {
    // load the first page of photos
    this.fetchPhotos(1);
    // Add a throttled onscroll function to the window to fetch more photos
    const self = this;
    function onScrollFn() {
      const scrollAmountRemaining = 0 + document.documentElement.offsetHeight - window.pageYOffset
        - document.documentElement.clientHeight;
      if (scrollAmountRemaining < 300) {
        self.fetchPhotos(self.state.pageLoaded + 1);
      }
    }
    window.addEventListener('scroll', throttle(onScrollFn, 500));
  }

  fetchPhotos(page) {
    const url = new URL(this.props.endpoint);
    const params = {
      consumer_key: this.props.consumerKey,
      // feature: 'popular',
      username: 'seanarcher',
      page,
      rpp: 40,
      sort: 'date_created',
      image_size: 4 // 900px on the longest edge
    };
    const self = this;
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    // console.log(`AJAX GET: ${url}`);
    fetch(url)
      .then(self.handleRequest)
      .then(res => {
        self.setState({
          currentPagePhotoData: res,
          allPhotos: this.state.allPhotos.concat(res.photos),
          pageLoaded: page
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
    photosToMap.forEach((photo, index) => {
      const indexToPopulate = index % columnCount;
      mappedPhotos[indexToPopulate].push(photo);
    });
    return photoColumns;
  }

  render() {
    const mappedPhotoColumns = this.mapPhotoColumns(this.state.allPhotos);
    return (
      <section className="photostream-container">
        {mappedPhotoColumns}
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
