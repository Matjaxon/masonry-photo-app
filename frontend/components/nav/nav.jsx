import React from 'react';
import Sidebar from '../sidebar/sidebar';
import PictureStreamContainer from '../picture_stream/picture_stream_container';
import { StickyContainer, Sticky } from 'react-sticky';

class Nav extends React.Component {
  render() {
    return(
      <div>
        <StickyContainer >
          <Sticky className="sticky-nav">
            <div className="favorites-container">
              Favorites
            </div>
          </Sticky>
          <section className="content-section">
            <Sidebar />
            <div id="picture-stream-outer-container">
              <PictureStreamContainer />
            </div>
          </section>
        </StickyContainer>
      </div>
    );
  }
}

export default Nav;
