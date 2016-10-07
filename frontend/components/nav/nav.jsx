import React from 'react';
import Sidebar from '../sidebar/sidebar';
import PictureStreamContainer from '../picture_stream/picture_stream_container';

class Nav extends React.Component {
  render() {
    return(
      <div>
        <div className="favorites-container">
          Favorites
        </div>
        <section className="content-section">
          <Sidebar />
          <PictureStreamContainer />
        </section>
      </div>
    );
  }
}

export default Nav;
