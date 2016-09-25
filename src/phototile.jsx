import React from 'react';

export default class PhotoTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { imageLoaded: false };
    this.handleImageLoaded = this.handleImageLoaded.bind(this);
  }

  handleImageLoaded() {
    this.setState({ imageLoaded: true });
  }

  render() {
    return (
      <div className={`phototile ${this.state.imageLoaded ? 'loaded' : ''}`}>
        <img
          alt={this.props.name}
          src={this.props.image_url}
          onLoad={this.handleImageLoaded}
        />
        <div>{this.props.name}</div>
      </div>
    );
  }
}

PhotoTile.propTypes = {
  name: React.PropTypes.string.isRequired,
  image_url: React.PropTypes.string.isRequired,
};
