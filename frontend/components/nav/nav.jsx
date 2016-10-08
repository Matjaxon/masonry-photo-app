import React from 'react';
import Sidebar from '../sidebar/sidebar';
import PictureStreamContainer from '../picture_stream/picture_stream_container';
import { StickyContainer, Sticky } from 'react-sticky';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      onlyFavorites: false
    };

    this._toggleFavoritesFilter = this._toggleFavoritesFilter.bind(this);
  }

  _toggleFavoritesFilter() {
    this.setState({onlyFavorites: !this.state.onlyFavorites});
  }


  render() {
    let favoritesFilterOnStyle = {
      right: "-20%"
    };
    let favoritesFilterOffStyle = {
      left: "-20%"
    };

    return(
      <div>
        <StickyContainer >
          <Sticky className="sticky-nav">
            <div className="nav-header">
              <div className="favorites-container">
                <div className="favorites-counter">
                  Favorites: {Object.keys(this.props.favorites).length}
                </div>
                <div className="favorites-toggle-container">
                  <div className="favorites-toggle-bar">
                    <div className="favorites-toggle"
                      onClick={this._toggleFavoritesFilter}
                      style={(this.state.onlyFavorites) ?
                        favoritesFilterOnStyle : favoritesFilterOffStyle}>
                      <i className="fa fa-heart-o fa-1x" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Sticky>
          <section className="content-section">
            <Sidebar />
            <div id="picture-stream-outer-container">
              <PictureStreamContainer onlyFavorites={this.state.onlyFavorites}/>
            </div>
          </section>
        </StickyContainer>
      </div>
    );
  }
}

export default Nav;
