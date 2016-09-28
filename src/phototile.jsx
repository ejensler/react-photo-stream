import React from 'react';

import './phototile.scss';

export default class PhotoTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageLoaded: false,
      isFavorited: false,
    };
    this.handleImageLoaded = this.handleImageLoaded.bind(this);
    this.handleImageFavorited = this.handleImageFavorited.bind(this);
  }

  handleImageLoaded() {
    this.setState({ imageLoaded: true });
  }

  handleImageFavorited() {
    if (!this.state.isFavorited) {
      this.props.favoritesCountCallback('increment');
    } else {
      this.props.favoritesCountCallback('decrement');
    }
    this.setState({ isFavorited: !this.state.isFavorited });
  }

  render() {
    return (
      <div
        className={`phototile ${this.state.imageLoaded ? 'loaded' : ''}
          ${this.state.isFavorited ? 'favorited' : ''}`}
        onClick={this.handleImageFavorited}
      >
        <div className="image-wrapper">
          <div className="view-count">
            <span>{`Viewed ${this.props.times_viewed} times`}</span>
          </div>
          <img
            alt={this.props.name}
            src={this.props.image_url}
            onLoad={this.handleImageLoaded}
          />
        </div>
        <div className="name">{this.props.name}</div>
      </div>
    );
  }
}

PhotoTile.propTypes = {
  favoritesCountCallback: React.PropTypes.func.isRequired,
  name: React.PropTypes.string.isRequired,
  image_url: React.PropTypes.string.isRequired,
  times_viewed: React.PropTypes.number.isRequired
};
