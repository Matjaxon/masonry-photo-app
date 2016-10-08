import React from 'react';

class PictureTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorited: false
    };
    this._toggleFavorite = this._toggleFavorite.bind(this);
  }

  _toggleFavorite() {
    this.setState({favorited: !this.state.favorited});
    this.props.toggleFavorite(this.props.picture);
  }

  render() {
    let picture = this.props.picture;
    let pictureWidth = this.props.pictureWidth;
    let columnSize = this.props.columnSize;
    let isFavorited = this.state.favorited;
    return(
      <div className={`picture-tile${(isFavorited) ? " favorited" : ""}`}
        style={{width: `${columnSize}px`}}
        onClick={this._toggleFavorite}>
        <div>
          <div className="picture-box">
            <img src={`${picture.image_url}`}></img>
          </div>
          <div className="picture-details">
            <div className="picture-title">
              {picture.name}
            </div>
          </div>
        </div>
        <div className="picture-views" style={{width: `${pictureWidth}px`}}>
          {picture.times_viewed} views
        </div>
      </div>
    );
  }
}

export default PictureTile;
