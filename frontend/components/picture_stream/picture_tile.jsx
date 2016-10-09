import React from 'react';

class PictureTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFavorite: this.props.isFavorite
    };
    this._toggleFavorite = this._toggleFavorite.bind(this);
  }

  _toggleFavorite() {
    this.setState({isFavorite: !this.state.isFavorite});
    this.props.toggleFavorite(this.props.picture);
  }

  render() {
    let picture = this.props.picture;
    let pictureWidth = this.props.pictureWidth;
    let columnSize = this.props.columnSize;
    let isFavorite = this.state.isFavorite;
    return(
      <div className={`picture-tile${(isFavorite) ? " favorite" : ""}`}
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
